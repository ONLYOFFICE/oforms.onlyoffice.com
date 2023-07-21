import axios from "axios";

const filePagesApi = async (url, name) => {
  const pdfFile = await axios.get(url, { responseType: "blob" });
  const pdfFileParams = new File([pdfFile.data], `${name}.pdf`, { type: pdfFile.headers["content-type"] });

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

  return filePages;
};

export default filePagesApi;