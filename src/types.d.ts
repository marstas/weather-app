interface WeatherApi {
  getByCoords: (coord: Coordinates, units: string) => Promise<GeneralInfo>;
  getByCityId: (id: number, units: string) => Promise<GeneralInfo>;
}

interface GeneralInfo {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: Coordinates;
  dt: number;
  id: number;
  main: MainStats;
  name: string;
  sys: Sys;
  timezone: number;
  visibility: number;
  weather: WeatherData[];
  wind: WindData;
}

interface Coordinates {
  lat: number;
  lon: number;
}

interface MainStats {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface WindData {
  deg: number;
  gust: number;
  speed: number;
}

interface CityData {
  id: 833;
  name: string;
  state: string;
  country: string;
  coord: Coordinates;
}

declare module "*.json" {
  const allCityData: CityData[];
  export default allCityData;
}
