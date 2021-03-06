import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Link,
  Text,
} from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

function Register() {
  const toast = useToast();
  const history = useHistory();
  const [, dispatch] = useUserContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: formData,
      }),
    });

    if (res.status === 201) {
      const {
        data: { user },
      } = await res.json();
      dispatch({
        type: "login",
        user,
      });
      history.push("/classes");
    } else if (res.status === 409) {
      toast({
        position: "top",
        title: "An account with this email already exists",
        description: "Try logging in",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      width="full"
      align="center"
      justifyContent="center"
      overflow="scroll"
      gridArea="main"
    >
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Create An Account</Heading>
        </Box>
        <Box my={4} textAlign="left" size="xl">
          <form onSubmit={handleSubmit}>
            <FormControl mt={4} isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                placeholder="John"
                onChange={handleChange}
                name="firstName"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                placeholder="Doe"
                onChange={handleChange}
                name="lastName"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                onChange={handleChange}
                name="email"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                onChange={handleChange}
                name="password"
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="yellow"
              variant="solid"
              width="full"
              mt={4}
            >
              Submit
            </Button>
          </form>
        </Box>
        <Box textAlign="center">
          <Text>
            Already have an account?{" "}
            <Link color="yellow.500" href="/login">
              Login.
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default Register;
