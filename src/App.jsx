import { Routes } from "./routes";
import { NavBar } from "./Layout/index";
import themeSystem from "./shared/themes/themeSystem";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={themeSystem}>
      <NavBar />
      <Routes />
    </ThemeProvider>
  )
}

export default App
