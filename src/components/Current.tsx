import React from "react";
import { isCityBookmarked } from "../utils";
import { CurrentData } from "../api";
import { imgBase } from "../constants";
import blackStar from "../assets/star_black.svg";
import yellowStar from "../assets/star_yellow.svg";

type CurrentProps = {
  data: CurrentData;
  units: string;
  city: string;
  bookmarks: string | null;
  onStarClick: (bookmark: string, remove?: boolean) => void;
};

export default function Current({
  data,
  units,
  city,
  bookmarks,
  onStarClick
}: CurrentProps): JSX.Element {
  const bookmarked = isCityBookmarked(bookmarks, city);

  return (
    <>
      <img alt={data.weather[0].description} src={`${imgBase}${data.weather[0].icon}@4x.png`} />
      <div className="current-info">
        <span className="current-temp">
          {`${Math.round(data.main.temp)}${units === "metric" ? "° C" : "° F"}`}
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