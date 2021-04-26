import React, { useEffect, useState } from "react";
import Api, { Coordinates, CurrentData, ForecastData } from "./Api";
import { isCityBookmarked, isValidSearchInput } from "./utils";
import UnitToggle from "./components/UnitToggle";
import SearchBar from "./components/SearchBar";
import DailyCard from "./components/DailyCard";
import CurrentWeather from "./components/CurrentWeather";
import Bookmark from "./components/Bookmark";
import "./App.scss";

export default function App(): JSX.Element {
  const [currentWeather, setCurrentWeather] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [apiError, setApiError] = useState("");
  const [city, setCity] = useState("");
  const [units, setUnits] = useState("metric");
  const [searchInput, setSearchInput] = useState("");
  const [bookmarks, setBookmarks] = useState<string | null>(localStorage.getItem("stars"));

  useEffect(() => {
    Api.getCurrentLocation().then((res) => {
      if (res.city) {
        setCity(res.city);
        setSearchInput(res.city);
      }
    });
  }, []); // get location/weather info on first load

  useEffect(() => {
    if (units && city)
      Api.getCurrentWeather(city, units).then((res) => {
        if (res.name !== "Error") {
          setCurrentWeather(res);
          setCoords({ lat: res.coord.lat, lon: res.coord.lon });
          setApiError("");
        } else {
          setCurrentWeather(null);
          setForecast(null);
          setApiError(`City "${city}" was not found`);
        }
      });
  }, [city, units]);

  useEffect(() => {
    if (units && coords) Api.getForecast(coords, units).then((res) => setForecast(res));
    return () => setCoords(null); // cleanup to avoid double API calls
  }, [coords, units]);

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "toggle-f") setUnits("imperial");
    else setUnits("metric");
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCity(searchInput);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleStarClick = (bookmark: string, remove = false) => {
    const bookmarkSet = new Set(localStorage.getItem("stars")?.split(";"));
    const bookmarked = isCityBookmarked(bookmarks, city);

    // Hold up to 5 city bookmarks in localStorage
    if (bookmarkSet.size === 5 && !bookmarked && !remove) {
      alert("Up to 5 bookmarks allowed.\nRemove a city first.");
    } else {
      if (bookmarked || bookmarks?.match(bookmark)) bookmarkSet.delete(bookmark);
      else bookmarkSet.add(bookmark);

      const bookmarkString = Array.from(bookmarkSet).join(";");
      localStorage.setItem(
        "stars",
        bookmarkString.indexOf(";") === 0 ? bookmarkString.substring(1) : bookmarkString
      );
      setBookmarks(bookmarkString);
    }
  };

  const handleBookmarkClick = (bookmark: string) => {
    const bookmarkedCity = bookmark.substring(0, bookmark.indexOf(","));
    setCity(bookmarkedCity);
    setSearchInput(bookmarkedCity);
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
      {bookmarks && (
        <div className="bookmarks-wrapper">
          {bookmarks
            .split(";")
            .map(
              (bookmark) =>
                bookmark && (
                  <Bookmark
                    key={bookmark}
                    bookmark={bookmark}
                    onBookmarkClick={handleBookmarkClick}
                    onStarClick={handleStarClick}
                  />
                )
            )}
        </div>
      )}
      {currentWeather && (
        <div className="current-wrapper">
          <CurrentWeather
            data={currentWeather}
            units={units}
            city={city}
            bookmarks={bookmarks}
            onStarClick={handleStarClick}
          />
        </div>
      )}
      <div className="forecast-wrapper">
        {forecast?.daily.map((card) => (
          <DailyCard key={card.dt} data={card} />
        ))}
      </div>
    </main>
  );
}
