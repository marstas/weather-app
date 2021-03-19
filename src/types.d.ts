interface WeatherApi {
  getCurrent: (city: string, units: string) => Promise<CurrentInfo>;
  getOnecall: (coord: Coordinates, units: string) => Promise<OnecallInfo>;
  getCity: () => Promise<IpFindData>;
}

interface CurrentInfo {
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

interface OnecallInfo {
  daily: DailyStats[];
}

interface DailyStats {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  clouds: number;
  pop: number;
  uvi: number;
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

interface IpFindData {
  city: string;
}
