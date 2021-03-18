import React, {useEffect, useState} from "react";
import weatherApi from "./api";
import "./App.scss";

const api = weatherApi();

const App: React.FC = () => {
  const [current, setCurrent] = useState<CurrentInfo>(null);
  const [daily, setDaily] = useState<DailyInfo>(null);
  const [error, setError] = useState<string>("");
  const [units, setUnits] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [coord, setCoord] = useState<Coordinates>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(true);

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
          setError(`City "${city}" was not found`);
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

  return (
    <main>
      <form onSubmit={handleSearchSubmit}>
        <label>
          <input
            type="search"
            placeholder="Search by city"
            value={searchInput}
            onChange={(event) => onSearchInput(event.target.value)}
          />
        </label>
        <input
          type="submit"
          value="Search"
          disabled={!validInput}
          title={validInput ? "Search" : "Numbers and special characters are not allowed"}
        />
      </form>
      <div>
        <input
          type="radio"
          name="toggle"
          value="°F"
          onChange={() => setToggle(!toggle)}
          checked={!toggle}
        />
        <label>°F</label>
        <input
          type="radio"
          name="toggle"
          value="°C"
          onChange={() => setToggle(!toggle)}
          checked={toggle}
        />
        <label>°C</label>
      </div>
      <span className="error-message">{error}</span>
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
