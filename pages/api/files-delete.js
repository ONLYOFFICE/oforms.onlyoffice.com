import S3 from "aws-sdk/clients/s3";

export default async function handler(req, res) {
  const { oformKey } = req.body;
  const fileName = oformKey.substring(0, oformKey.length - 6)

  try {
    // Delete files from Amazon S3
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_REGION,
    });

    const docxfParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${oformKey}.docxf`
    };

    const oformParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: oformKey
    };

    const pdfParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${fileName}.pdf`
    };

    const cardPreviewParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${fileName}?card_preview.png`
    };

    const templateImgParams = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET,
      Key: `${fileName}?template_image.png`
    };

    await s3.deleteObject(docxfParams).promise();
    await s3.deleteObject(oformParams).promise();
    await s3.deleteObject(pdfParams).promise();
    await s3.deleteObject(cardPreviewParams).promise();
    await s3.deleteObject(templateImgParams).promise();

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.log(error)
    return res.status(500).send("Error");
  };
};