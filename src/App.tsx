import React, { useEffect, useState } from "react";
import weatherApi, { Coordinates, CurrentData, ForecastData } from "./api";
import { imgBase } from "./constants";
import blackStar from "./assets/star_black.svg";
import yellowStar from "./assets/star_yellow.svg";
import "./App.scss";

const api = weatherApi();

export default function App(): JSX.Element {
  const [current, setCurrent] = useState<CurrentData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric");
  const [searchInput, setSearchInput] = useState("");
  const [validInput, setValidInput] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [starred, setStarred] = useState(false);
  const [stars, setStars] = useState<string | null>(null);

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
          setError("");
        } else {
          setCurrent(null);
          setForecast(null);
          setError(`City "${city}" was not found`);
        }
      });
  }, [city, units]);

  useEffect(() => {
    if (units && coords) api.getForecast(coords, units).then((res) => setForecast(res));
    return () => setCoords(null); // cleanup to avoid double API calls
  }, [coords, units]);

  useEffect(() => {
    const u = toggle ? "metric" : "imperial";
    setUnits(u);
  }, [toggle]);

  useEffect(() => {
    setStars(localStorage.getItem("stars"));
    if (stars?.match(new RegExp(city, "i"))) setStarred(true);
    else setStarred(false);
  }, [city, stars]);

  const onSearchInput = (value: string) => {
    setSearchInput(value);
    setValidInput(validateInput(value));
  };

  const validateInput = (value: string) => {
    if (value.match(/[0-9$&+,:;=?@#|'<>.^*()%!~[{\\}/\]-]/)) return false;
    else return true;
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setCity(searchInput);
    event.preventDefault();
  };

  const handleStarClick = (bookmark: string, remove = false) => {
    const starsSet = new Set(localStorage.getItem("stars")?.split(";") || [bookmark]);
    if (starsSet.size === 5 && !starred && !remove) {
      alert("Up to 5 bookmarks allowed.\nRemove a city first.");
    } else {
      if (starred || stars?.match(bookmark)) starsSet.delete(bookmark);
      else starsSet.add(bookmark);

      const starsArray = Array.from(starsSet).join(";");
      localStorage.setItem(
        "stars",
        starsArray.indexOf(";") === 0 ? starsArray.substring(1) : starsArray
      );
      setStars(starsArray);
      if (bookmark.match(new RegExp(city, "i"))) setStarred(!starred);
    }
  };

  const handleBookmarkClick = (bookmark: string) => {
    const b = bookmark.substring(0, bookmark.indexOf(","));
    setCity(b);
    setSearchInput(b);
  };

  const renderStars = () => {
    return (
      stars &&
      stars?.split(";").map((star, indx) => {
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

  const renderCurrent = () => {
    return (
      current && (
        <>
          <img
            alt={current.weather[0].description}
            src={`${imgBase}${current.weather[0].icon}@4x.png`}
          />
          <div className="current-info">
            <span className="current-temp">
              {`${Math.round(current.main.temp)}${units === "metric" ? "° C" : "° F"}`}
            </span>
            <span>
              <i>{`${current.name}, ${current.sys.country}`}</i>
              <img
                alt="star"
                className="star"
                title={starred ? "Remove from bookmarks" : "Add to bookmarks"}
                src={starred ? yellowStar : blackStar}
                onClick={() => handleStarClick(`${current.name}, ${current.sys.country}`)}
              />
            </span>
          </div>
        </>
      )
    );
  };

  const renderDaily = () => {
    return (
      forecast &&
      forecast.daily.length > 0 &&
      forecast.daily.map((d, indx) => {
        return (
          <div key={indx} className="daily-card">
            <div>{new Date(d.dt * 1000).toUTCString().slice(0, 7)}</div>
            <img alt={d.weather[0].description} src={`${imgBase}${d.weather[0].icon}@2x.png`} />
            <div>
              <span className="temp-max">{Math.round(d.temp.max)}°&nbsp;</span>
              <span className="temp-min">
                <sup>{Math.round(d.temp.min)}°</sup>
              </span>
            </div>
            <div className="daily-description">
              <i>{d.weather[0].description}</i>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <main>
      <header>
        <div className="units-radio-wrapper">
          <input
            type="radio"
            id="toggle-f"
            name="toggle-f"
            onChange={() => setToggle(!toggle)}
            checked={!toggle}
          />
          <label htmlFor="toggle-f" className="label-f">
            &nbsp;° F
          </label>
          <input
            type="radio"
            id="toggle-c"
            name="toggle-c"
            onChange={() => setToggle(!toggle)}
            checked={toggle}
          />
          <label htmlFor="toggle-c" className="label-c">
            &nbsp;° C
          </label>
        </div>
        <form onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="search"
            placeholder="Enter city name..."
            value={searchInput}
            spellCheck="false"
            onChange={(event) => onSearchInput(event.target.value)}
          />
          <input
            className="search-submit"
            type="submit"
            value="Search"
            disabled={!validInput || !searchInput}
            title={validInput ? "Search" : "Numbers and special characters are not allowed"}
          />
        </form>
      </header>
      <div className={`error-message ${error ? "" : "d-none"}`}>{error}</div>
      <div className="bookmarks-wrapper">{renderStars()}</div>
      <div className="current-wrapper">{renderCurrent()}</div>
      <div className="daily-wrapper">{renderDaily()}</div>
    </main>
  );
}
