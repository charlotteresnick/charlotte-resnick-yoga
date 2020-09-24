import React from "react";
import { Grid } from "@chakra-ui/core";
import { Navbar, Footer } from "../components";

function FullWidth({ children }) {
  return (
    <Grid
      gridTemplateAreas={`
        "nav"
        "main"
        "footer"
      `}
      gridTemplateRows="[top] 10vh [main-start] 80vh [main-end] 10vh [bottom]"
      height="100vh"
    >
      <Navbar />
      {/* Ideally add grid-area: main to the child component automagically */}
      {children}
      <Footer />
    </Grid>
  );
}

export default FullWidth;
