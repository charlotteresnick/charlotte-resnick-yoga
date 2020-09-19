import React from "react";

import { Flex, Text } from "@chakra-ui/core";

function Footer() {
  return (
    <Flex
      gridArea="footer"
      justifyContent="space-between"
      alignItems="flex-end"
      p="1em"
    >
      <Text fontSize="sm" fontWeight="medium">
        {"by Charlotte Resnick"}
      </Text>
      <Text fontSize="sm" fontWeight="medium">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Text>
    </Flex>
  );
}

export default Footer;
