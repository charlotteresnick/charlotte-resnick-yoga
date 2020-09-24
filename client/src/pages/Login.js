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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: formData }),
    });

    if (res.status === 200) {
      const {
        data: { user },
      } = await res.json();
      dispatch({
        type: "login",
        user,
      });
      history.push("/classes");
    } else if (res.status === 401) {
      toast({
        position: "top",
        title: "error title",
        description: "error description",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
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
                name="email"
                placeholder="test@test.com"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={6} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="*******"
                onChange={handleChange}
              />
            </FormControl>
            <Link href="/classes">
              <Button
                type="submit"
                colorScheme="yellow"
                variant="solid"
                width="full"
                mt={4}
              >
                Submit
              </Button>
            </Link>
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
