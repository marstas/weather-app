import React from "react";
import { isCityBookmarked } from "../utils";
import { CurrentData, Units } from "../models";
import { imgBase } from "../Api";
import blackStar from "../assets/star_black.svg";
import yellowStar from "../assets/star_yellow.svg";

type CurrentWeatherProps = {
  data: CurrentData;
  units: Units;
  city: string;
  bookmarks: string[];
  onStarClick: (bookmark: string, remove?: boolean) => void;
};

export default function CurrentWeather({
  data,
  units,
  city,
  bookmarks,
  onStarClick
}: CurrentWeatherProps): JSX.Element {
  const bookmarked = isCityBookmarked(bookmarks, city);
  const imageSource = `${imgBase}${data.weather[0].icon}@4x.png`;
  const weatherDescription = data.weather[0].description;
  const currentTemp = `${Math.round(data.main.temp)}${units === Units.Metric ? "° C" : "° F"}`;
  const location = `${data.name}, ${data.sys.country}`;

  return (
    <>
      <img alt={weatherDescription} src={imageSource} />
      <div className="current-info">
        <span className="current-temp">{currentTemp}</span>
        <span>
          <i>{location}</i>
          <img
            alt="star"
            className="star"
            title={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            src={bookmarked ? yellowStar : blackStar}
            onClick={() => onStarClick(location)}
          />
        </span>
      </div>
    </>
  );
}
