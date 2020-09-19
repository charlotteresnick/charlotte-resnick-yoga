import { extendTheme } from "@chakra-ui/core";

const breakpoints = ["320px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

// Let's say you want to add custom colors
const customTheme = extendTheme({
  fonts: {
    custom: "Didact Gothic, sans-serif",
  },
  colors: {
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  breakpoints,
});

export default customTheme;
