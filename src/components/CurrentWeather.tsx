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
  bookmarks: string | null;
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

  return (
    <>
      <img alt={data.weather[0].description} src={`${imgBase}${data.weather[0].icon}@4x.png`} />
      <div className="current-info">
        <span className="current-temp">
          {`${Math.round(data.main.temp)}${units === Units.Metric ? "° C" : "° F"}`}
        </span>
        <span>
          <i>{`${data.name}, ${data.sys.country}`}</i>
          <img
            alt="star"
            className="star"
            title={bookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
            src={bookmarked ? yellowStar : blackStar}
            onClick={() => onStarClick(`${data.name}, ${data.sys.country}`)}
          />
        </span>
      </div>
    </>
  );
}
