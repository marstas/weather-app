import React, { useEffect, useState } from "react";
import Api from "./Api";
import { AxiosError } from "axios";
import { Coordinates, CurrentData, ForecastData, Units } from "./models";
import {
  isCityBookmarked,
  isValidSearchInput,
  getLocalBookmarks,
  setLocalBookmarks
} from "./utils";
import Header from "./components/header/Header";
import UnitToggle from "./components/header/UnitToggle";
import SearchBar from "./components/header/SearchBar";
import Bookmarks from "./components/bookmarks/Bookmarks";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import "./App.scss";

export default function App(): JSX.Element {
  const [currentWeather, setCurrentWeather] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [units, setUnits] = useState(Units.Metric);
  const [searchInput, setSearchInput] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>(getLocalBookmarks());

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
    const isBookmarked = isCityBookmarked(bookmarks, city);

    // Hold up to 5 city bookmarks in localStorage
    if (bookmarks.length === 5 && !isBookmarked && !remove) {
      alert("Up to 5 bookmarks allowed.\nRemove a city first.");
    } else {
      if (isBookmarked || bookmarks.includes(bookmark))
        bookmarks.splice(bookmarks.indexOf(bookmark), 1);
      else bookmarks.push(bookmark);

      setBookmarks([...bookmarks]);
      setLocalBookmarks(bookmarks);
    }
  };

  const handleBookmarkClick = (bookmark: string) => {
    const bookmarkedCity = bookmarks.find((b) => b === bookmark);
    if (bookmarkedCity) {
      setCity(bookmarkedCity);
      setSearchInput(bookmarkedCity);
    }
  };

  return (
    <main>
      <Header>
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
        <SearchBar
          input={searchInput}
          isDisabled={!isValidSearchInput(searchInput)}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
      </Header>
      {apiError && <code className="error-message">{apiError}</code>}
      {bookmarks.length > 0 && (
        <Bookmarks handleBookmarkClick={handleBookmarkClick} handleStarClick={handleStarClick}>
          {bookmarks}
        </Bookmarks>
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
      {forecast && <Forecast>{forecast}</Forecast>}
    </main>
  );
}
