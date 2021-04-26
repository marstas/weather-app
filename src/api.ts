import axios from "axios";
import { currentWeather, forecast, currentLocation } from "./constants";

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

export default class Api {
  static async getCurrentWeather(city: string, units: string): Promise<CurrentData> {
    try {
      const res = await axios.get(currentWeather, { params: { q: city, units } });
      return res.data;
    } catch (error) {
      return error.toJSON();
    }
  }

  static async getForecast(coords: Coordinates, units: string): Promise<ForecastData> {
    try {
      const res = await axios.get(forecast, {
        params: { lat: coords.lat, lon: coords.lon, units }
      });
      return res.data;
    } catch (error) {
      return error.toJSON();
    }
  }

  static async getCurrentLocation(): Promise<IpFindData> {
    try {
      const res = await axios.get(currentLocation);
      return res.data;
    } catch (error) {
      return error.toJSON();
    }
  }
}
