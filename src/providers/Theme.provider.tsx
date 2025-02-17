import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      light: "#f98130",
      main: "#ff6600",
      dark: "#cb5303",
      contrastText: "#fff",
    },
  },
});

export function ThemeProviderMui({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
