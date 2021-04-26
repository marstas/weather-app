import React, { useEffect, useState } from "react";
import weatherApi, { Coordinates, CurrentData, ForecastData } from "../api";
import yellowStar from "../assets/star_yellow.svg";
import { isCityBookmarked, isValidSearchInput } from "../utils";
import UnitToggle from "./UnitToggle";
import SearchBar from "./SearchBar";
import DailyCard from "./DailyCard";
import "./App.scss";
import Current from "./Current";

const api = weatherApi();

export default function App(): JSX.Element {
  const [current, setCurrent] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [apiError, setApiError] = useState("");
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [searchInput, setSearchInput] = useState("");
  const [bookmarks, setBookmarks] = useState<string | null>(localStorage.getItem("stars"));

  useEffect(() => {
    api.getCity().then((res) => {
      if (res.city) {
        setCity(res.city);
        setSearchInput(res.city);
      }
    });
  }, []); // get location/weather info on first load

  useEffect(() => {
    if (units && city)
      api.getCurrent(city, units).then((res) => {
        if (res.name !== "Error") {
          setCurrent(res);
          setCoords({ lat: res.coord.lat, lon: res.coord.lon });
          setApiError("");
        } else {
          setCurrent(null);
          setForecast(null);
          setApiError(`City "${city}" was not found`);
        }
      });
  }, [city, units]);

  useEffect(() => {
    if (units && coords) api.getForecast(coords, units).then((res) => setForecast(res));
    return () => setCoords(null); // cleanup to avoid double API calls
  }, [coords, units]);

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "toggle-f") setUnits("imperial");
    else setUnits("metric");
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setCity(searchInput);
    event.preventDefault();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleStarClick = (bookmark: string, remove = false) => {
    const bookmarkSet = new Set(localStorage.getItem("stars")?.split(";") || [bookmark]);
    const bookmarked = isCityBookmarked(bookmarks, city);

    // Hold up to 5 city bookmarks in localStorage
    if (bookmarkSet.size === 5 && !bookmarked && !remove) {
      alert("Up to 5 bookmarks allowed.\nRemove a city first.");
    } else {
      if (bookmarked || bookmarks?.match(bookmark)) bookmarkSet.delete(bookmark);
      else bookmarkSet.add(bookmark);

      const bookmarkArray = Array.from(bookmarkSet).join(";");
      localStorage.setItem(
        "stars",
        bookmarkArray.indexOf(";") === 0 ? bookmarkArray.substring(1) : bookmarkArray
      );
      setBookmarks(bookmarkArray);
    }
  };

  const handleBookmarkClick = (bookmark: string) => {
    const b = bookmark.substring(0, bookmark.indexOf(","));
    setCity(b);
    setSearchInput(b);
  };

  const renderBookmarks = () => {
    return (
      bookmarks &&
      bookmarks?.split(";").map((star, indx) => {
        return (
          <div className="bookmark" key={indx}>
            <button className="bookmark-search" onClick={() => handleBookmarkClick(star)}>
              {star}
            </button>
            <img
              alt="remove bookmark"
              className="bookmark-remove"
              title="Remove from bookmarks"
              src={yellowStar}
              onClick={() => handleStarClick(star, true)}
            />
          </div>
        );
      })
    );
  };

  return (
    <main>
      <header>
        <div className="units-radio-wrapper">
          <UnitToggle
            system="imperial"
            isChecked={units === "imperial"}
            onUnitChange={handleUnitChange}
          />
          <UnitToggle
            system="metric"
            isChecked={units === "metric"}
            onUnitChange={handleUnitChange}
          />
        </div>
        <SearchBar
          input={searchInput}
          disabled={!isValidSearchInput(searchInput)}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </header>
      <div className={`error-message ${apiError ? "" : "d-none"}`}>{apiError}</div>
      <div className="bookmarks-wrapper">{renderBookmarks()}</div>
      <div className="current-wrapper">
        {current && (
          <Current
            data={current}
            units={units}
            city={city}
            bookmarks={bookmarks}
            onStarClick={handleStarClick}
          />
        )}
      </div>
      <div className="forecast-wrapper">
        {forecast?.daily.map((card) => (
          <DailyCard key={card.dt} data={card} />
        ))}
      </div>
    </main>
  );
}
