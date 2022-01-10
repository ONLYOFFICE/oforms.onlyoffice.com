import React from "react";
import Link from "../../../../../../components/link";

const LinkOO = (props) => {
  const defaultLink = `http://onlyoffice.com/${props.href}`;
  return <Link href={defaultLink} {...props} />;
};

export default LinkOO;
