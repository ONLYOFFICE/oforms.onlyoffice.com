import { useState, useEffect } from "react";

const useFormattedDate = (date) => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(
    () => setFormattedDate(new Date(date).toLocaleDateString("en-US")),
    []
  );

  return formattedDate;
};

export default useFormattedDate;