import React from "react";
import Link from "../../../../../../components/link";

const LinkOO = (props) => {
  let tmp = props.href !== undefined ? props.href : "";
  const defaultLink = `https://onlyoffice.com${tmp}`;

  return <Link href={defaultLink} {...props} />;
};

export default LinkOO;
