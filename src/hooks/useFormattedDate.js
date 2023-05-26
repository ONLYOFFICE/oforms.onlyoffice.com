import { useState, useEffect } from "react";

const useFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState(null);

  useEffect(
    () => setFormattedDate(new Date().getFullYear()),
    []
  );

  return formattedDate;
};

export default useFormattedDate;