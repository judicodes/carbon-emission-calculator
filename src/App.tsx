import { AppBar } from "@mui/material";
import React from "react";
import "./App.css";
import ElectricityInput from "./components/ElectricityInput/ElectricityInput";

function App() {
  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        Carbon Emission Calculator
      </AppBar>
      <ElectricityInput onSubmitClick={() => {}} />
    </div>
  );
}

export default App;
