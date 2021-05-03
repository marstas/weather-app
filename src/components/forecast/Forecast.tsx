import React from "react";
import { ForecastData } from "../../models";
import DailyCard from "./DailyCard";

type ForecastProps = {
  children: ForecastData;
};

export default function Forecast({ children }: ForecastProps): JSX.Element {
  return (
    <div className="forecast-wrapper">
      {children.daily.map((card) => (
        <DailyCard key={card.dt} data={card} />
      ))}
    </div>
  );
}
