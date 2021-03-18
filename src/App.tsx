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

  useEffect(() => {
    if (units && city) api.getCurrent(city, units).then((res) => setCurrent(res));
  }, [city, units]);

  useEffect(() => {
    if (units && coord) api.getDaily(coord, units).then((res) => setDaily(res));
  }, [coord, units]);

  return (
    <>
      <span>
        <pre>{JSON.stringify(current, null, 2)}</pre>
      </span>
      <span>
        <pre>{JSON.stringify(daily, null, 2)}</pre>
      </span>
    </>
  );
};

export default App;
