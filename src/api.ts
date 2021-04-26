import axios from "axios";
import { currentWeather, forecast, currentLocation } from "./constants";

type WeatherApi = {
  getCurrentWeather: (city: string, units: string) => Promise<CurrentData>;
  getForecast: (coords: Coordinates, units: string) => Promise<ForecastData>;
  getCurrentLocation: () => Promise<IpFindData>;
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
    getCurrentWeather: async (city: string, units: string) => {
      try {
        const res = await axios.get(currentWeather, { params: { q: city, units } });
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    },
    getForecast: async (coords: Coordinates, units: string) => {
      try {
        const res = await axios.get(forecast, {
          params: { lat: coords.lat, lon: coords.lon, units }
        });
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    },
    getCurrentLocation: async () => {
      try {
        const res = await axios.get(currentLocation);
        return res.data;
      } catch (error) {
        return error.toJSON();
      }
    }
  };
}
