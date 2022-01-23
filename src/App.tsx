import { AppBar } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import "./App.css";
import {
  CarbonEmissionChart,
  CarbonEmissionDataPoint,
} from "./components/CarbonEmissionChart/CarbonEmissionChart";
import {
  ElectricityInput,
  ElectricityInputValue,
} from "./components/ElectricityInput/ElectricityInput";

interface APIResponse {
  data: {
    attributes: {
      country: string;
      carbon_kg: number;
      estimated_at: string;
    };
  };
}

function App() {
  const carbonInterfaceURL = "https://www.carboninterface.com/api/v1/estimates";
  const axiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  const [carbonEmissionData, setCarbonEmissionData] = React.useState<
    CarbonEmissionDataPoint[]
  >([]);

  const fetchCarbonEmission = async () => {
    try {
      const response = await axios.get(carbonInterfaceURL, axiosRequestConfig);
      const emissions = response.data.map((dataPoint: APIResponse) => {
        const carbonEmissionDataPoint: CarbonEmissionDataPoint = {
          country: dataPoint.data.attributes.country,
          carbonInKg: dataPoint.data.attributes.carbon_kg,
          estimatedAt: new Date(dataPoint.data.attributes.estimated_at),
        };
        return carbonEmissionDataPoint;
      });
      setCarbonEmissionData(emissions);
    } catch (err) {
      alert(`Error processing your request: ${err}`);
    }
  };

  const postElectricityInputData = async (data: ElectricityInputValue) => {
    try {
      await axios.post(
        carbonInterfaceURL,
        {
          type: "electricity",
          electricity_unit: data.unit,
          electricity_value: data.electricityUsage,
          country: data.countryCode,
        },
        axiosRequestConfig
      );
      await fetchCarbonEmission();
    } catch (err) {
      alert(`Error processing your request: ${err}`);
    }
  };

  useEffect(() => {
    fetchCarbonEmission();
  }, []);

  return (
    <div className="app">
      <AppBar position="static" className="app-bar">
        Carbon Emission Calculator
      </AppBar>
      <ElectricityInput onSubmitClick={postElectricityInputData} />
      {carbonEmissionData.length > 0 && (
        <CarbonEmissionChart data={carbonEmissionData} />
      )}
      <footer className="footer">
        Powered by{" "}
        <a
          href="https://www.carboninterface.com/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Carbon Interface
        </a>
      </footer>
    </div>
  );
}

export default App;
