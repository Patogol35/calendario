import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00e5ff",
    },
    background: {
      default: "#0b0f19",
      paper: "#121826",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
