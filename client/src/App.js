import React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import {
  Home,
  About,
  Contact,
  Classes,
  Pricing,
  Register,
  Login,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FullWidth } from "./layouts";

import customTheme from "./theme";
import { UserProvider } from "./contexts/userContext";

function App() {
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: action.user,
        };

      case "logout":
        return {
          ...state,
          user: {},
        };

      default:
        return state;
    }
  };
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <UserProvider reducer={reducer}>
        <Router>
          <Switch>
            <Route exact path="/">
              <FullWidth>
                <Home />
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
            <Route path="/register">
              <FullWidth>
                <Register />
              </FullWidth>
            </Route>
            <Route path="/login">
              <FullWidth>
                <Login />
              </FullWidth>
            </Route>
          </Switch>
        </Router>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
