import axios from "axios";
import { Coordinates, CurrentData, ForecastData, IpFindData, Units } from "./models";

const weatherMapApiKey = "1f1c011ac8a3f7b0fac99225b91c9b25";
const ipFindApiKey = "24bc3767-44d0-4b94-987b-54a923b42a19";
const currentWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${weatherMapApiKey}`;
const forecast = `https://api.openweathermap.org/data/2.5/onecall?appid=${weatherMapApiKey}&exclude=current,minutely,hourly,alerts`;
const currentLocation = `https://ipfind.co/me?auth=${ipFindApiKey}`;

export const imgBase = "https://openweathermap.org/img/wn/";

export default class Api {
  static async getCurrentWeather(city: string, units: Units): Promise<CurrentData> {
    try {
      const res = await axios.get(currentWeather, { params: { q: city, units } });
      return res.data;
    } catch (error) {
      return error.toJSON();
    }
  }

  static async getForecast(coords: Coordinates, units: Units): Promise<ForecastData> {
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
