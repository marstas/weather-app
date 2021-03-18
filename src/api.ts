import axios from "axios";

const apiKey = "86e9a453e4af0c55cc11e8bf54c567d0";

const weatherApi = (): WeatherApi => {
  return {
    getCurrentByCoord: async (coord: Coordinates, units: string) => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=${units}&lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
      );
      return res.data;
    },
    getCurrentByCity: async (name: string, units: string) => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?units=${units}&q=${name}&appid=${apiKey}`
      );
      return res.data;
    }
  };
};

export default weatherApi;
