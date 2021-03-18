import {default as allCityData} from "../static/city.list.min.json";
// import * as allCityData from "../static/city.list.min.json";

export const getCityId = (name: string): number => {
  const city: CityData = JSON.parse(allCityData.toString()).find((c) => c.name === name);
  return city.id;
};
