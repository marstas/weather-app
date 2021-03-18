import React, {useEffect, useState} from "react";
import weatherApi from "./api";
import "./App.scss";

const api = weatherApi();

const App: React.FC = () => {
  const [current, setCurrent] = useState<CurrentInfo>(null);
  const [daily, setDaily] = useState<DailyInfo>(null);
  const [units, setUnits] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [coord, setCoord] = useState<Coordinates>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [validInput, setValidInput] = useState<boolean>(true);

  useEffect(() => {
    if (units && city)
      api.getCurrent(city, units).then((res) => {
        setCurrent(res);
        setCoord({lat: res.coord.lat, lon: res.coord.lon});
      });
  }, [city, units]);

  useEffect(() => {
    if (units && coord) api.getDaily(coord, units).then((res) => setDaily(res));
  }, [coord, units]);

  const onSearchInput = (value: string) => {
    setSearchInput(value);
    setValidInput(validateInput(value));
  };

  const validateInput = (value: string) => {
    if (value.match(/[^a-zA-Z\s:]/)) return false;
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
        <input type="submit" value="Search" disabled={!validInput} />
      </form>
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
