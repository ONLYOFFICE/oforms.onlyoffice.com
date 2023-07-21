import axios from "axios";
import jwt from "jsrsasign";

export default async function handler(req, res) {
  const { fileName, docxfAwsUrl } = req.body;

  try {
    // Generate a unique key for payload
    let key = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 1; i <= 12; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      key += str.charAt(char);
    };

    // Payload data
    const oformPayload = {
      "filetype": "docxf",
      "key": key,
      "outputtype": "oform",
      "title": fileName,
      "url": docxfAwsUrl
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
      "url": docxfAwsUrl
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

    // // Get result from oform and template image requests
    const result = await axios.all([oformRequest, templateImageRequest]);

    return res.status(200).json([{
      "oformConvertUrl": result[0].data.fileUrl, 
      "templateImageUrl": result[1].data.fileUrl
    }]);
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error");
  };
};