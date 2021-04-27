import React from "react";
import { imgBase } from "../../Api";
import { DailyData } from "../../models";

type DailyCardProps = {
  data: DailyData;
};

export default function DailyCard({ data }: DailyCardProps): JSX.Element {
  const date = new Date(data.dt * 1000).toUTCString().slice(0, 7); // example: Wed, 28
  const imageSource = `${imgBase}${data.weather[0].icon}@2x.png`;
  const weatherDescription = data.weather[0].description;
  const maxTemp = `${Math.round(data.temp.max)}° `;
  const minTemp = `${Math.round(data.temp.min)}°`;

  return (
    <div className="daily-card">
      <div>{date}</div>
      <img alt={weatherDescription} src={imageSource} />
      <div>
        <span className="temp-max">{maxTemp}</span>
        <span className="temp-min">
          <sup>{minTemp}</sup>
        </span>
      </div>
      <div className="daily-description">
        <i>{weatherDescription}</i>
      </div>
    </div>
  );
}
