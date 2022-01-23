import { Autocomplete, InputLabel, TextField } from "@mui/material";
import React, { useEffect } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import {
  countries,
  Country,
  getDisplayNameFromCountryCode,
} from "../../utils/countries";
import "./CarbonEmissionChart.css";

export interface CarbonEmissionDataPoint {
  country: string;
  estimatedAt: Date;
  carbonInKg: number;
}

interface CarbonEmissionChartInputProps {
  data: CarbonEmissionDataPoint[];
}

function CarbonEmissionChart({ data }: CarbonEmissionChartInputProps) {
  const [selectedCountryFilter, setSelectedCountryFilter] =
    React.useState<Country | null>(null);
  const [dataPoints, setDataPoints] = React.useState(data);

  const getParsedTimestamp = (timestamp: Date) =>
    timestamp.toLocaleDateString();

  const isDataAvailableForCountry = (option: Country) =>
    dataPoints.findIndex((dataPoint) => dataPoint.country === option.code) > -1;

  const renderTooltip = ({
    active,
    payload,
  }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
      return (
        <div>
          <p>{payload[0]?.payload?.estimatedAt?.toLocaleString()}</p>
          <p>{`Country: ${getDisplayNameFromCountryCode(
            payload[0]?.payload?.country
          )}`}</p>
          <p>{`Carbon: ${payload[0]?.payload?.carbonInKg} kg`}</p>
        </div>
      );
    }

    return null;
  };

  const tooltipStyle = {
    backgroundColor: "rgba(131, 128, 129, 0.4)",
    color: "rgba(85, 84, 84, 1)",
    padding: ".5rem",
    borderRadius: "10px",
  };

  const filterByCountry = (country: Country | null) => {
    setSelectedCountryFilter(country);
    if (!country) {
      setDataPoints(data);
    } else {
      setDataPoints(
        dataPoints.filter((dataPoint) => dataPoint.country === country.code)
      );
    }
  };

  useEffect(() => {
    filterByCountry(selectedCountryFilter);
  }, [selectedCountryFilter]);

  const sortDataByDate = () => {
    dataPoints.sort((dataPoint, dataPointToCompare) => {
      if (dataPoint.estimatedAt > dataPointToCompare.estimatedAt) {
        return 1;
      }
      if (dataPoint.estimatedAt < dataPointToCompare.estimatedAt) {
        return -1;
      }
      return 0;
    });
  };

  useEffect(() => {
    setDataPoints(data);
    sortDataByDate();
    if (selectedCountryFilter) {
      filterByCountry(selectedCountryFilter);
    }
  }, [data]);

  return (
    <div data-testid="carbon-emission-chart">
      <div className="country-filter">
        <InputLabel htmlFor="country-filter">
          Filter emissions by country
        </InputLabel>
        <Autocomplete
          className="mb-2"
          id="country-filter"
          disablePortal
          value={selectedCountryFilter}
          options={countries}
          getOptionLabel={(option) => option.displayName}
          getOptionDisabled={(option) => !isDataAvailableForCountry(option)}
          onChange={(_, newValue) => {
            setSelectedCountryFilter(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <AreaChart
        width={1000}
        height={350}
        data={dataPoints}
        margin={{ top: 30, right: 30, left: 30, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="estimatedAt" tickFormatter={getParsedTimestamp} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip content={renderTooltip} wrapperStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="carbonInKg"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorCarbon)"
        />
      </AreaChart>
    </div>
  );
}

export { CarbonEmissionChart };
