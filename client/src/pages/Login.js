import React from "react";

import {
  ButtonGroup,
  Heading,
  Image,
  Flex,
  Stack,
  Button,
} from "@chakra-ui/core";

function Login(props) {
  return (
    <Stack
      direction={["column-reverse", "column-reverse", "row", "row"]}
      spacing={8}
      align="center"
      justify="center"
      gridArea="main"
    >
      <Flex direction="column" p="10" align="center" justify="center">
        <Heading as="h1" pb="1em" size="2xl" fontFamily="custom">
          Charlotte Resnick Yoga
        </Heading>
        <ButtonGroup spacing="4">
          <Button variant="outline" size="lg" border="1px">
            about
          </Button>
          <Button colorScheme="yellow" variant="solid" size="lg">
            classes
          </Button>
        </ButtonGroup>
      </Flex>
      <Image
        boxSize={["400px", "400px", "400px", "500px"]}
        src="/images/yoga_studio.jpg"
        alt="Charlotte in a yoga pose"
      />
    </Stack>
  );
}

export default Login;
