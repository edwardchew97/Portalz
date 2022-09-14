// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
export const chakraTheme = extendTheme({
  config,
  fonts: {
    heading: `Inter, sans-serif`,
    body: `Inter, sans-serif`,
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#01000a",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
