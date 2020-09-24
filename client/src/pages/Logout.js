import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/core";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../contexts/userContext";

function Logout() {
  const [, dispatch] = useUserContext();
  const history = useHistory();
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
    fetch(`/api/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "logout",
    });
  }, [dispatch]);

  useEffect(() => {
    let interval = null;
    if (seconds !== 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      history.push("/");
    }
    return () => clearInterval(interval);
  }, [seconds, history]);

  return (
    <Flex width="full" align="center" justifyContent="center" gridArea="main">
      You have been logged out. You will be redirected in {seconds} seconds.
    </Flex>
  );
}

export default Logout;
