import { AppBar } from "@mui/material";
import React from "react";
import "./App.css";
import {
  ElectricityInput,
  ElectricityInputValue,
} from "./components/ElectricityInput/ElectricityInput";

function App() {
  const postElectricityInputData = (data: ElectricityInputValue) => {
    console.log(data);
    // TODO: call API POST here
  };

  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        Carbon Emission Calculator
      </AppBar>
      <ElectricityInput onSubmitClick={postElectricityInputData} />
    </div>
  );
}

export default App;
