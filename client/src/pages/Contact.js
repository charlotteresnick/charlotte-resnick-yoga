import React, { useState } from "react";

import {
  Image,
  Stack,
  Box,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  useToast,
  Link,
} from "@chakra-ui/core";
import PageTitle from "../components/PageTitle";
import { useUserContext } from "../contexts/userContext";

const ContactHeader = () => {
  return (
    <Box textAlign="center">
      <Heading fontSize="2xl">Contact Me</Heading>
    </Box>
  );
};
const ContactForm = () => {
  const [{ isLoggedIn, user }] = useUserContext();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 201) {
      toast({
        position: "top",
        title: "Message Sent",
        description: "I will be in contact with you soon",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      toast({
        position: "top",
        title: "Message could not be sent",
        description: "Please try again",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box my={4} textAlign="left">
      <form onSubmit={handleSubmit}>
        {!isLoggedIn ? (
          <>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                name="name"
                value={formData.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
            </FormControl>
          </>
        ) : (
          <>
            <FormControl isReadOnly>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={user.fullName}
                name="name"
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={user.email}
                name="email"
              />
            </FormControl>
          </>
        )}
        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea
            type="textarea"
            placeholder="Enter your message"
            onChange={handleChange}
            name="message"
            value={formData.message}
          />
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
