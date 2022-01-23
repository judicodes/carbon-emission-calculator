import React from "react";
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

import { getDisplayNameFromCountryCode } from "../../utils/countries";

export interface CarbonEmissionDataPoint {
  country: string;
  estimatedAt: Date;
  carbonInKg: number;
}

interface CarbonEmissionChartInputProps {
  data: CarbonEmissionDataPoint[];
}

// TODO: add country filter

function CarbonEmissionChart({ data }: CarbonEmissionChartInputProps) {
  data.sort((dataPoint, dataPointToCompare) => {
    if (dataPoint.estimatedAt > dataPointToCompare.estimatedAt) {
      return 1;
    }
    if (dataPoint.estimatedAt < dataPointToCompare.estimatedAt) {
      return -1;
    }
    return 0;
  });

  const getParsedTimestamp = (timestamp: Date) =>
    timestamp.toLocaleDateString();

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

  return (
    <div>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
