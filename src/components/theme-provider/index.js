import { createTheming } from "@callstack/react-theme-provider";
import { Base } from "../../themes";

const { ThemeProvider, withTheme, useTheme } = createTheming(Base);

export { ThemeProvider, withTheme, useTheme };
