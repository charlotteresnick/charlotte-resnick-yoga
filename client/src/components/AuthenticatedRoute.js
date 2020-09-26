import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

const AuthenticatedRoute = ({ children, path, adminOnly }) => {
  const [{ isLoggedIn, isAdmin }] = useUserContext();

  if (!isLoggedIn || (adminOnly && !isAdmin)) {
    return <Redirect to="/login" />;
  }

  return <Route path={path}>{children}</Route>;
};

export default AuthenticatedRoute;
