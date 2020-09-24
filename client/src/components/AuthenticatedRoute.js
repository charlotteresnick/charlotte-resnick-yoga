import React from "react";
import { Redirect, Route } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";

const AuthenticatedRoute = ({ children, path, adminOnly }) => {
  const [state] = useUserContext();
  console.log("authenticatedRoute", state);

  if (!state?.user || (adminOnly && !state?.user?.adminOnly)) {
    return <Redirect to="/login" />;
  }

  return <Route path={path}>{children}</Route>;
};

export default AuthenticatedRoute;
