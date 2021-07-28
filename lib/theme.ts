import { extendTheme, ThemeOverride } from "@chakra-ui/react";

// 2. Add your color mode config
const themeOverride: ThemeOverride = {
  config: {
    useSystemColorMode: true,
  },
};

// 3. extend the theme
export const theme = extendTheme(themeOverride);
