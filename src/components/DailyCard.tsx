import React from "react";
import { imgBase } from "../Api";
import { DailyData } from "../models";

type DailyCardProps = {
  data: DailyData;
};

export default function DailyCard({ data }: DailyCardProps): JSX.Element {
  return (
    <div className="daily-card">
      <div>{new Date(data.dt * 1000).toUTCString().slice(0, 7)}</div>
      <img alt={data.weather[0].description} src={`${imgBase}${data.weather[0].icon}@2x.png`} />
      <div>
        <span className="temp-max">{Math.round(data.temp.max)}°&nbsp;</span>
        <span className="temp-min">
          <sup>{Math.round(data.temp.min)}°</sup>
        </span>
      </div>
      <div className="daily-description">
        <i>{data.weather[0].description}</i>
      </div>
    </div>
  );
}
