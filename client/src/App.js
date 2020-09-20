import React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { Home, About, Contact, Classes, Register, Login } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FullWidth } from "./layouts";

import customTheme from "./theme";

function App() {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
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
    </ChakraProvider>
  );
}

export default App;
