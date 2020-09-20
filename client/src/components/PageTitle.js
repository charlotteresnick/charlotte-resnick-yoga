import React from "react";

import { Flex, Heading } from "@chakra-ui/core";

function PageTitle({ title, ...rest }) {
  return (
    <Flex align="center" justify="center">
      <Heading
        as="h1"
        size="lg"
        mt="1em"
        mb="2em"
        py="1em"
        borderTop="1px"
        borderBottom="1px"
        display="inline-block"
        mx="auto"
        {...rest}
      >
        {title || "No Title Passed"}
      </Heading>
    </Flex>
  );
}

export default PageTitle;
