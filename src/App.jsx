import { Routes } from "./routes";
import { NavBar } from "./components/index";
import themeSystem from "./shared/themes/themeSystem";
import { ThemeProvider } from "@mui/material";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={themeSystem}>
      <div className="App">
        <NavBar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
