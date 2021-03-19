import axios from "axios";
import {current, daily, ipFind} from "./constants";

const weatherApi = (): WeatherApi => {
  return {
    getCurrent: async (city: string, units: string) => {
      let res = null;
      try {
        res = await axios.get(`${current}&q=${city}&units=${units}`);
      } catch (error) {
        return error.toJSON();
      }
      return res.data;
    },
    getDaily: async (coord: Coordinates, units: string) => {
      let res = null;
      try {
        res = await axios.get(`${daily}&lat=${coord.lat}&lon=${coord.lon}&units=${units}`);
      } catch (error) {
        return error.toJSON();
      }
      return res.data;
    },
    getCity: async () => {
      let res = null;
      try {
        res = await axios.get(ipFind);
      } catch (error) {
        return error.toJSON();
      }
      return res.data;
    }
  };
};

export default weatherApi;
