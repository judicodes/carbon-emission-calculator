import { AppBar } from "@mui/material";
import React from "react";
import "./App.css";
import {
  CarbonEmissionChart,
  CarbonEmissionDataPoint,
} from "./components/CarbonEmissionChart/CarbonEmissionChart";
import {
  ElectricityInput,
  ElectricityInputValue,
} from "./components/ElectricityInput/ElectricityInput";

function App() {
  const carbonEmissionData: CarbonEmissionDataPoint[] = [
    {
      country: "de",
      estimatedAt: new Date("2021-12-17T03:24:00"),
      carbonInKg: 25,
    },

    {
      country: "ca",
      estimatedAt: new Date("2022-01-13T03:24:00"),
      carbonInKg: 65.438476,
    },
    {
      country: "us",
      estimatedAt: new Date("2021-05-12T03:24:00"),
      carbonInKg: 300.3287,
    },
  ];

  const postElectricityInputData = (data: ElectricityInputValue) => {
    // eslint-disable-next-line no-console
    console.log(data);
    // TODO: call API POST here
  };

  // TODO: only render chart when data not empty

  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        Carbon Emission Calculator
      </AppBar>
      <ElectricityInput onSubmitClick={postElectricityInputData} />
      <CarbonEmissionChart data={carbonEmissionData} />
    </div>
  );
}

export default App;
