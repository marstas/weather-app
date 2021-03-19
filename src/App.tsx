import React, {useEffect, useState} from "react";
import weatherApi from "./api";
import {imgBase} from "./constants";
import "./App.scss";

const api = weatherApi();

const App: React.FC = () => {
  const [current, setCurrent] = useState<CurrentInfo>(null);
  const [daily, setDaily] = useState<DailyInfo>(null);
  const [error, setError] = useState<string>("");
  const [units, setUnits] = useState<string>("metric");
  const [city, setCity] = useState<string>("");
  const [coord, setCoord] = useState<Coordinates>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(true);

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
          setCoord({lat: res.coord.lat, lon: res.coord.lon});
          setError("");
        } else {
          setCurrent(null);
          setDaily(null);
          setError(`City "${city}" was not found.`);
        }
      });
  }, [city, units]);

  useEffect(() => {
    if (units && coord) api.getDaily(coord, units).then((res) => setDaily(res));
    return () => setCoord(null); // cleanup to avoid double API calls
  }, [coord, units]);

  useEffect(() => {
    const u = toggle ? "metric" : "imperial";
    setUnits(u);
  }, [toggle]);

  const onSearchInput = (value: string) => {
    setSearchInput(value);
    setValidInput(validateInput(value));
  };

  const validateInput = (value: string) => {
    if (value.match(/[0-9$&+,:;=?@#|'<>.^*()%!~[{\\}/\]-]/)) return false;
    else return true;
  };

  const handleSearchSubmit = (event) => {
    setCity(searchInput);
    event.preventDefault();
  };

  const renderCurrent = () => {
    return (
      current && (
        <>
          <img
            alt={current.weather[0].description}
            src={`${imgBase}${current.weather[0].icon}@2x.png`}
          />
          <div className="current-info">
            <span className="current-temp">
              {`${Math.round(current.main.temp)}${units === "metric" ? " °C" : " °F"}`}
            </span>
            <span className="current-city">{`${current.name}, ${current.sys.country}`}</span>
          </div>
        </>
      )
    );
  };

  return (
    <main>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Enter city name..."
          value={searchInput}
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
      <div className="units-radio-wrapper">
        <input type="radio" name="toggle-f" onChange={() => setToggle(!toggle)} checked={!toggle} />
        <label className="label-f">°F</label>
        <input type="radio" name="toggle-c" onChange={() => setToggle(!toggle)} checked={toggle} />
        <label>°C</label>
      </div>
      <div className="error-message">{error}</div>
      <div className="current-wrapper">{renderCurrent()}</div>
      <span>
        <pre>{JSON.stringify(current, null, 2)}</pre>
      </span>
      <span>
        <pre>{JSON.stringify(daily, null, 2)}</pre>
      </span>
    </main>
  );
};

export default App;
