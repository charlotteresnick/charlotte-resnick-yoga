import React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { FullWidth } from "./layouts";
import {
  Home,
  About,
  Contact,
  Classes,
  Pricing,
  Register,
  Login,
  Logout,
  Admin,
} from "./pages";
import customTheme from "./theme";
import { UserProvider } from "./contexts/userContext";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./components";

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <UserProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <FullWidth>
                <Home />
                {/* <Admin /> */}
              </FullWidth>
            </Route>
            <Route path="/about">
              <FullWidth>
                <About />
              </FullWidth>
            </Route>
            <Route path="/contact">
              <FullWidth>
                <Contact />
              </FullWidth>
            </Route>
            <Route path="/classes">
              <FullWidth>
                <Classes />
              </FullWidth>
            </Route>
            <Route path="/pricing">
              <FullWidth>
                <Pricing />
              </FullWidth>
            </Route>
            <UnauthenticatedRoute path="/register">
              <FullWidth>
                <Register />
              </FullWidth>
            </UnauthenticatedRoute>
            <UnauthenticatedRoute path="/login">
              <FullWidth>
                <Login />
              </FullWidth>
            </UnauthenticatedRoute>
            <Route path="/logout">
              <FullWidth>
                <Logout />
              </FullWidth>
            </Route>
            <AuthenticatedRoute adminOnly path="/admin">
              <FullWidth>
                <Admin />
              </FullWidth>
            </AuthenticatedRoute>
          </Switch>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
