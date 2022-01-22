import {
  Autocomplete,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import { countries } from "../../assets/countries";
import "./ElectricityInput.css";

function ElectricityInput() {
  const [selectedCountry, setSelectedCountry] = React.useState<string | null>(
    null
  );
  const [electricityUsage, setElectricityUsage] = React.useState(0);
  const [selectedUnit, setSelectedUnit] = React.useState("kwh");

  const units = ["kwh", "mwh"];

  return (
    <div className="electricity-input">
      <FormGroup className="form-group">
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
          renderInput={(params) => <TextField {...params} />}
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
            <Input
              id="electricity-usage-input"
              type="number"
              value={electricityUsage}
              onChange={(event) =>
                setElectricityUsage(parseFloat(event.target.value))
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
      </FormGroup>
    </div>
  );
}

export default ElectricityInput;
