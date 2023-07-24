import S3 from "aws-sdk/clients/s3";

export default async function handler(req, res) {
  const { name } = req.body;

  try {
    // Delete File from AWS S3
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: name,
    };

    s3.deleteObject(params);

    return res.status(200).send("Form submitted successfully");
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error");
  };
};