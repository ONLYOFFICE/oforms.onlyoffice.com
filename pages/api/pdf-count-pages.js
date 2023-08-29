import axios from "axios";

export default async function handler(req, res) {
  const { pdfConvertUrl } = req.body;

  try {
    const response = await axios.get(pdfConvertUrl, { responseType: "arraybuffer" });
    const pdfContent = Buffer.from(response.data).toString("utf-8");
    const matches = pdfContent.match(/\/Count\s+(\d+)/g);

    const lastMatch = matches[matches.length - 1];
    const pageCount = parseInt(lastMatch.match(/\d+/)[0]);

    return res.status(200).json({
      "filePages": pageCount
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  };
};