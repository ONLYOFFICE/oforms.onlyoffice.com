import axios from "axios";
import jwt from "jsrsasign";
import S3 from "aws-sdk/clients/s3";

const imageUploadApi = async (file, name) => {
  const nameSubstring = name.substring(0, name.length - 6);

  // Get date for folder creation in AWS
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1 < 10 ? `0${currentDate.getMonth() + 1}` : currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  // Generate a unique key for payload
  let key = "";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 1; i <= 12; i++) {
    let char = Math.floor(Math.random() * str.length + 1);
    key += str.charAt(char);
  };

  try {
    // Data for AWS S3
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
    });

    // AWS params for docxf
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${nameSubstring}_${year}_${month}_${day}/${name}`,
      Body: file
    };

    // Get docxf response from AWS
    const docxfResponse = await s3.putObject(params).promise();

    // Payload data
    const docxfPayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "png",
      "thumbnail": {
        "aspect": 0,
        "first": true,
        "height": 1448,
        "width": 1024
      },
      "title": name,
      "url": `https:/${docxfResponse.$response.request.httpRequest.path}`
    };

    const pdfPayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "pdf",
      "title": name,
      "url": `https:/${docxfResponse.$response.request.httpRequest.path}`
    };

    // Generate tokens for AuthorizationJwt
    const docxfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), docxfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
    const pdfToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), pdfPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

    // Send request to ConvertService and get result
    const docxfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, docxfPayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${docxfToken}`
      }
    });

    const pdfRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, pdfPayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${pdfToken}`
      }
    });

    // Сonvert pdf link to File data
    const pdfFile = await axios.get(`${pdfRequest.data.fileUrl}`, { responseType: "blob" });
    const pdfFileParams = new File([pdfFile.data], `${nameSubstring}.pdf`, { type: pdfFile.headers["content-type"] });

    // PDF file pages
    function readFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
    
        reader.onload = () => {
          resolve(reader.result.match(/\/Type[\s]*\/Page[^s]/g).length);
        };
      });
    };

    const filePages = await readFile(pdfFileParams);

    return [docxfRequest.data.fileUrl, pdfRequest.data.fileUrl, docxfResponse.$response.request.httpRequest.path, filePages.toString()];
  } catch (error) {
    console.error(error);
  };
};

export default imageUploadApi;