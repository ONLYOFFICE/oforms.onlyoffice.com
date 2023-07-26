import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import jwt from "jsrsasign";

export default async function handler(req, res) {
  const { fileName, docxfUrl } = req.body;

  try {
    // Generate a unique key for payload
    let key = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i <= 12; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      key += str.charAt(char);
    };

    // Data for Amazon S3
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
    });

    // Payload data
    const oformPayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "oform",
      "title": fileName,
      "url": docxfUrl
    };

    const templateImagePayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "png",
      "thumbnail": {
        "aspect": 0,
        "first": true,
        "height": 916,
        "width": 648
      },
      "title": fileName,
      "url": docxfUrl
    };

    // Generate tokens for AuthorizationJwt
    const oformToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), oformPayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);
    const templateImageToken = jwt.KJUR.jws.JWS.sign("HS256", JSON.stringify({ alg: "HS256" }), templateImagePayload, process.env.NEXT_PUBLIC_FILES_DOCSERVICE_SECRET);

    // Send requests to ConvertService and get result
    const oformRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, oformPayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${oformToken}`
      }
    });

    const templateImageRequest = await axios.post(`${process.env.NEXT_PUBLIC_EDITOR_API_URL}/ConvertService.ashx`, templateImagePayload, {
      headers: {
        "Content-Type": "application/json",
        "AuthorizationJwt": `Bearer ${templateImageToken}`
      }
    });

    // Get response oform and template image files from Amazon S3
    const oformResponse = await axios.get(oformRequest.data.fileUrl, { responseType: "arraybuffer" });
    const templateImageResponse = await axios.get(templateImageRequest.data.fileUrl, { responseType: "arraybuffer" });

    // Payload data
    const oformParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${fileName.substring(0, fileName.length - 6)}.oform`,
      Body: oformResponse.data,
      ContentType: oformResponse.headers["content-type"]
    };

    const templateImageParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${fileName.substring(0, fileName.length - 6)}?template_image.png`,
      Body: templateImageResponse.data,
      ContentType: templateImageResponse.headers["content-type"]
    };

    // Upload files to Amazon s3
    const oformRes = await s3.upload(oformParams).promise();
    const templateImageRes = await s3.upload(templateImageParams).promise();

    // Get location file and rename
    const oformConvertUrl = oformRes.Location.replace("/s3.amazonaws.com", "");
    const templateImageConvertUrl = templateImageRes.Location.replace("/s3.amazonaws.com", "");

    return res.status(200).json({
      "oformConvertUrl": oformConvertUrl,
      "templateImageConvertUrl": templateImageConvertUrl,
      "oformConvertName": oformRes.Key
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error");
  };
};