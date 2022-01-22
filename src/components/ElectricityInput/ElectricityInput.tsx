import {
  Autocomplete,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { countries } from "../../assets/countries";
import "./ElectricityInput.css";

interface ElectricityInputValue {
  countryCode: string;
  electricityUsage: number;
  unit: string;
}
interface ElectricityInputProps {
  onSubmitClick(input: ElectricityInputValue): void;
}

function ElectricityInput({ onSubmitClick }: ElectricityInputProps) {
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

  const [isFormValid, setIsFormValid] = React.useState(false);

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

  useEffect(() => {
    setIsFormValid(
      !hasCountrySelectError &&
        !hasElectricityUsageInputError &&
        !!selectedCountry &&
        !!electricityUsage
    );
  }, [
    hasCountrySelectError,
    hasElectricityUsageInputError,
    selectedCountry,
    electricityUsage,
  ]);

  const submitElectricityInput = () => {
    const electricityInputValue: ElectricityInputValue = {
      countryCode: selectedCountry ?? "",
      electricityUsage: electricityUsage ?? 0,
      unit: selectedUnit,
    };
    onSubmitClick(electricityInputValue);
  };

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

      <div className="row mb-2">
        <div className="column electricity-input">
          <InputLabel htmlFor="electricity-usage-input" required>
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
      <div className="row justify-end">
        <Button
          variant="contained"
          disabled={!isFormValid}
          onClick={submitElectricityInput}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

ElectricityInput.propTypes = {
  onSubmitClick: PropTypes.func.isRequired,
};

export default ElectricityInput;
