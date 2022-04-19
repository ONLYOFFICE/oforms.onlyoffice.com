import React from "react";
import { Trans } from "react-i18next";

import Text from "@components/common/text";

const TransAccorionItems = ({ i18nKey, initText, children }) => {
  return (
    <Text as={"p"} className="text-trans-accordion">
      <Trans i18nKey={i18nKey}>
        {initText}
        {children}
      </Trans>
    </Text>
  );
};

export default TransAccorionItems;
