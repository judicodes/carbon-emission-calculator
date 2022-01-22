import {
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { countries } from "../../assets/countries";
import "./ElectricityInput.css";

function ElectricityInput() {
  const units = ["kwh", "mwh"];

  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    null
  );
  const [electricityUsage, setElectricityUsage] = React.useState<number | null>(
    null
  );
  const [electricityUsageInput, setElectricityUsageInput] = React.useState("");
  const [selectedUnit, setSelectedUnit] = React.useState("kwh");

  const [hasElectricityUsageInputError, setHasElectricityUsageInputError] =
    React.useState(false);
  const [hasCountrySelectError, setHasCountrySelectError] =
    React.useState(false);

  const validateCountrySelect = () => {
    if (selectedCountry === null || selectedCountry.trim() === "") {
      setHasCountrySelectError(true);
    } else {
      setHasCountrySelectError(false);
    }
  };

  const validateElectricityUsageInput = (value: string) => {
    const postiveNumberRegExp = /^[+]?([0-9]+(?:[.][0-9]*)?|\.[0-9]+)$/;
    if (!postiveNumberRegExp.test(value)) {
      setHasElectricityUsageInputError(true);
    } else {
      setHasElectricityUsageInputError(false);
    }
  };

  const handleElectricityInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    validateElectricityUsageInput(event.target.value);
    setElectricityUsageInput(event.target.value);
  };

  useEffect(() => {
    setElectricityUsage(
      hasElectricityUsageInputError ? null : parseFloat(electricityUsageInput)
    );
  }, [electricityUsageInput]);

  return (
    <div className="electricity-input">
      <InputLabel htmlFor="country-select" required>
        Location (Country)
      </InputLabel>
      <Autocomplete
        id="country-select"
        data-testid="location-input"
        disablePortal
        options={countries}
        getOptionLabel={(option) => option.displayName}
        onChange={(_, newValue) => {
          setSelectedCountry(newValue?.code ?? null);
        }}
        onBlur={validateCountrySelect}
        renderInput={(params) => (
          <TextField
            {...params}
            error={hasCountrySelectError}
            helperText={hasCountrySelectError ? "Please select a location" : ""}
            onChange={() => {
              setHasCountrySelectError(false);
            }}
          />
        )}
        className="mb-2"
      />

      <div className="row">
        <div className="column electricity-input">
          <InputLabel
            htmlFor="electricity-usage-input"
            className="align-start"
            required
          >
            Electricity Usage
          </InputLabel>
          <TextField
            id="electricity-usage-input"
            value={electricityUsageInput}
            onChange={handleElectricityInputChange}
            onBlur={(event) =>
              validateElectricityUsageInput(event.target.value)
            }
            error={hasElectricityUsageInputError}
            helperText={
              hasElectricityUsageInputError
                ? "Please enter a positive number"
                : ""
            }
          />
        </div>
        <div className="column unit">
          <InputLabel id="unit-select-label" className="align-start">
            Unit
          </InputLabel>
          <Select
            labelId="unit-select-label"
            value={selectedUnit}
            onChange={(event) => setSelectedUnit(event.target.value)}
          >
            {units.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}

export default ElectricityInput;
