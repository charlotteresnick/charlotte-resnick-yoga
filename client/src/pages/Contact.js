import React from "react";

import {
  Image,
  Stack,
  Box,
  Text,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Link,
} from "@chakra-ui/core";
import PageTitle from "../components/PageTitle";

const ContactHeader = () => {
  return (
    <Box textAlign="center">
      <Heading fontSize="2xl">Contact Me</Heading>
    </Box>
  );
};
const ContactForm = () => {
  return (
    <Box my={4} textAlign="left">
      <form>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input type="text" placeholder="Enter your name" />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>

        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea type="textarea" placeholder="Enter your message" />
        </FormControl>

        <Button colorScheme="yellow" variant="solid" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

function Contact(props) {
  return (
    <Box
      gridArea="main"
      overflow="scroll"
      direction="column"
      px="10%"
      justify="center"
      align="center"
    >
      <PageTitle title="Contact" />
      <Stack
        direction={["column", "column", "row", "row"]}
        spacing={8}
        align="center"
        justify="space-evenly"
      >
        <Image
          maxWidth="325px"
          src="/images/leaf.jpg"
          alt="Charlotte in a yoga pose"
        />
        <Box direction="column" px="10" align="center" justify="center">
          <Text marginBottom="5">
            I'm currently living and teaching in San Francisco. Please fill out
            the contact form below or reach out to me at{" "}
            <Link
              color="yellow.500"
              href="mailto:charlotte@charlotteresnickyoga.com?subject=Private Session Inquiry"
            >
              charlotte@charlotteresnickyoga.com
            </Link>{" "}
            with inquiries or to book a private session.
          </Text>
          <Box
            borderWidth={1}
            maxWidth="900px"
            maxHeight="375px"
            borderRadius={4}
            textAlign="center"
            boxShadow="lg"
            overflow="scroll"
          >
            <Box px={3} pt={2}>
              <ContactHeader />
              <ContactForm />
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Contact;
