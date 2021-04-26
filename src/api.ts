import axios from "axios";
import { current, onecall, ipFind } from "./constants";

type WeatherApi = {
  getCurrent: (city: string, units: string) => Promise<CurrentData>;
  getForecast: (coords: Coordinates, units: string) => Promise<ForecastData>;
  getCity: () => Promise<IpFindData>;
};

type IpFindData = {
  city: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type CurrentData = {
  name: string;
  coord: Coordinates;
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  weather: WeatherData[];
};

export type ForecastData = {
  daily: DailyData[];
};

export type DailyData = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherData[];
};

export type WeatherData = {
  description: string;
  icon: string;
};

export default function weatherApi(): WeatherApi {
  return {
    getCurrent: async (city: string, units: string) => {
      try {
        const res = await axios.get(`${current}&q=${city}&units=${units}`);
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    },
    getForecast: async (coords: Coordinates, units: string) => {
      try {
        const res = await axios.get(
          `${onecall}&lat=${coords.lat}&lon=${coords.lon}&units=${units}`
        );
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    },
    getCity: async () => {
      try {
        const res = await axios.get(ipFind);
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    }
  };
}
