import React, { useState } from "react";
import { Box, Heading, Flex, Text, Button, ButtonGroup } from "@chakra-ui/core";
import { GrSpa } from "react-icons/gr";

import { CustomLink as Link } from ".";
import { isEmpty } from "../util";
import { useHistory } from "react-router-dom";

const user = {
  // name: "Charlotte",
};

const LinkableNavbarItem = ({
  children,
  url,
  onlyLoggedIn = false,
  onlyLoggedOut = false,
}) => {
  const shouldRender =
    (onlyLoggedIn && !isEmpty(user)) ||
    (onlyLoggedOut && isEmpty(user)) ||
    (!onlyLoggedIn && !onlyLoggedOut);
  return shouldRender ? <Link to={url}>{children}</Link> : null;
};

const NavbarLinks = (
  <>
    <LinkableNavbarItem url="/about">
      <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        about
      </Text>
    </LinkableNavbarItem>
    <LinkableNavbarItem url="/classes">
      <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        classes
      </Text>
    </LinkableNavbarItem>
    <LinkableNavbarItem url="/contact">
      <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
        contact
      </Text>
    </LinkableNavbarItem>
  </>
);

const NavbarButtons = (
  <ButtonGroup spacing={4}>
    <LinkableNavbarItem url="/login" onlyLoggedOut>
      <Button border="1px" variant="outline">
        Login
      </Button>
    </LinkableNavbarItem>
    <LinkableNavbarItem url="/logout" onlyLoggedIn>
      <Button border="1px" variant="outline">
        Logout
      </Button>
    </LinkableNavbarItem>
    <LinkableNavbarItem url="/register" onlyLoggedOut>
      <Button colorScheme="yellow" variant="solid">
        Register
      </Button>
    </LinkableNavbarItem>
  </ButtonGroup>
);

const Navbar = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      alignContent="center"
      wrap="wrap"
      padding="1.5rem"
      zIndex="2"
      position={{ sm: show ? "absolute" : "inherit", md: "inherit" }}
      bg="white"
      left="0"
      right="0"
      gridArea="nav"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="xl" pb="10px">
            <GrSpa />
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="black"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Flex
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        {NavbarLinks}
      </Flex>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {NavbarButtons}
      </Box>
    </Flex>
  );
};

export default Navbar;
