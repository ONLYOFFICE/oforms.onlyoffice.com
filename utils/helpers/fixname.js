const reName = (str) => {
  return str
    .replace(/\s/g, "-")
    .replace(/[{()}]/g, "")
    .toLowerCase();
};

export default reName;
