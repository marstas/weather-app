import axios, { AxiosError } from "axios";
import { Coordinates, CurrentData, ForecastData, IpFindData, Units } from "./models";

const weatherMapApiKey = "86e9a453e4af0c55cc11e8bf54c567d0";
const ipFindApiKey = "54151f53-0664-4a57-992c-ecb0f474aaf5";
const currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherMapApiKey}`;
const forecast = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherMapApiKey}&exclude=current,minutely,hourly,alerts`;
const currentLocation = `https://ipfind.co/me?auth=${ipFindApiKey}`;

export const imgBase = "https://openweathermap.org/img/wn/";

export default class Api {
  static async getCurrentWeather(city: string, units: Units): Promise<CurrentData> {
    return await axios
      .get(currentWeather, { params: { q: city, units } })
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  static async getForecast(coords: Coordinates, units: Units): Promise<ForecastData> {
    return await axios
      .get(forecast, {
        params: { lat: coords.lat, lon: coords.lon, units }
      })
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  }

  static async getCurrentLocation(): Promise<IpFindData> {
    return await axios
      .get(currentLocation)
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}
