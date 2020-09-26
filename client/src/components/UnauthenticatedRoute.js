import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

const UnauthenticatedRoute = ({ children, path }) => {
  const [{ isLoggedIn }] = useUserContext();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return <Route path={path}>{children}</Route>;
};

export default UnauthenticatedRoute;
