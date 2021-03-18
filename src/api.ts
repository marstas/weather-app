import axios from "axios";
import {current, daily} from "./constants";

const weatherApi = (): WeatherApi => {
  return {
    getCurrent: async (city: string, units: string) => {
      const res = await axios.get(`${current}&q=${city}&units=${units}`);
      return res.data;
    },
    getDaily: async (coord: Coordinates, units: string) => {
      const res = await axios.get(`${daily}&lat=${coord.lat}&lon=${coord.lon}&units=${units}`);
      return res.data;
    }
  };
};

export default weatherApi;
