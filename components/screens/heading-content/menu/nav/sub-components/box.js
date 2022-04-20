import React from "react";

import Box from "@components/common/box";

const BoxMenu = (props) => {
  return (
    <Box
      flexDirection="column"
      alignContent="flex-start"
      alignItems="flex-start"
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default BoxMenu;
