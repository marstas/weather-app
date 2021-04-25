import axios from "axios";
import { current, onecall, ipFind } from "./constants";

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
    getOnecall: async (coord: Coordinates, units: string) => {
      try {
        const res = await axios.get(`${onecall}&lat=${coord.lat}&lon=${coord.lon}&units=${units}`);
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
