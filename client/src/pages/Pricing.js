import React from "react";

import { Image, Stack, Box, Text, Heading } from "@chakra-ui/core";
import PageTitle from "../components/PageTitle";

function Pricing(props) {
  return (
    <Box
      gridArea="main"
      overflow="scroll"
      direction="column"
      px="10%"
      justify="center"
      align="center"
    >
      <PageTitle title="Pricing" />
      <Stack
        direction={["column", "column", "row", "row"]}
        spacing={8}
        align="center"
        justify="space-evenly"
      >
        <Image
          maxWidth="500px"
          src="/images/puja.jpg"
          alt="Charlotte in a yoga pose"
        />
        <Box
          direction="column"
          p="10"
          align="center"
          justify="center"
          width="475px"
          textAlign="center"
        >
          <Heading fontSize="2xl" pb="4" mb="4" borderBottom="1pt solid black">
            Private Instruction
          </Heading>
          <Text my={2}>Introductory 90 minute session: $100</Text>
          <Text my={2}>1 - 90 minute session: $150</Text>
          <Text my={2}>2 - 90 minute sessions: $250 ($50 saved)</Text>
          <Text my={2}>5 - 90 minute sessions: $575 ($175 saved)</Text>
          <Text my={2}>10 - 90 minute sessions: $1000 ($500 saved)</Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default Pricing;
