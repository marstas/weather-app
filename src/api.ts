import axios from "axios";
import {current, onecall, ipFind} from "./constants";

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
    getOnecall: async (coord: Coordinates, units: string) => {
      let res = null;
      try {
        res = await axios.get(`${onecall}&lat=${coord.lat}&lon=${coord.lon}&units=${units}`);
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
