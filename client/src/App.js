import React from "react";
import { ChakraProvider } from "@chakra-ui/core";
import { Home } from "./pages";
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
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
