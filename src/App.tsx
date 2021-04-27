import React, { useEffect, useState } from "react";
import Api from "./Api";
import { AxiosError } from "axios";
import { Coordinates, CurrentData, ForecastData, Units } from "./models";
import { isCityBookmarked, isValidSearchInput, getBookmarks } from "./utils";
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
  const [apiError, setApiError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [units, setUnits] = useState(Units.Metric);
  const [searchInput, setSearchInput] = useState("");
  const [bookmarks, setBookmarks] = useState<string | null>(getBookmarks());

  useEffect(() => {
    Api.getCurrentLocation()
      .then((res) => {
        setCity(res.city);
        setSearchInput(res.city);
      })
      .catch((error: AxiosError) => setApiError(`IPfind API error: ${error.response?.data.error}`));
  }, []); // get location/weather info on first load

  useEffect(() => {
    if (city)
      Api.getCurrentWeather(city, units)
        .then((res) => {
          setCurrentWeather(res);
          setCoords({ lat: res.coord.lat, lon: res.coord.lon });
          setApiError(null);
        })
        .catch((error: AxiosError) => {
          setCurrentWeather(null);
          setForecast(null);
          setApiError(`Open Weather Map API error: ${error.response?.data.message}`);
        });
  }, [city, units]);

  useEffect(() => {
    if (coords) Api.getForecast(coords, units).then((res) => setForecast(res));
    return () => setCoords(null); // cleanup to avoid double API calls
  }, [coords, units]);

  const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "toggle-f") setUnits(Units.Imperial);
    else setUnits(Units.Metric);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCity(searchInput);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleStarClick = (bookmark: string, remove = false) => {
    const bookmarkSet = new Set(getBookmarks()?.split(";"));
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
            isChecked={units === Units.Imperial}
            onUnitChange={handleUnitChange}
          />
          <UnitToggle
            system="metric"
            isChecked={units === Units.Metric}
            onUnitChange={handleUnitChange}
          />
        </div>
        <SearchBar
          input={searchInput}
          isDisabled={!isValidSearchInput(searchInput)}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </header>
      {apiError && <code className="error-message">{apiError}</code>}
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
