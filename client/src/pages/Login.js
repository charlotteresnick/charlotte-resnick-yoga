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

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const history = useHistory();
  const toast = useToast();
  const [, dispatch] = useUserContext();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.data?.user) {
          dispatch({
            type: "login",
            user: res?.data?.user,
          });
          history.push("/");
        } else if (res?.data?.errors) {
          const errors = res?.data?.errors;
          if (errors) {
            errors.forEach(({ title, description }) => {
              toast({
                position: "top",
                title,
                description,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            });
          }
        }
      });
  };
  return (
    <Flex width="full" align="center" justifyContent="center" gridArea="main">
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left" size="xl">
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="test@test.com"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="*******"
                onChange={handleChange}
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
        <Text>
          Don't have an account?{" "}
          <Link color="yellow.500" href="/register">
            Register.
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
