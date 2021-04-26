export type IpFindData = {
  city: string;
};

export type Coordinates = {
  lat: number;
  lon: number;
};

export type CurrentData = {
  name: string;
  coord: Coordinates;
  main: {
    temp: number;
  };
  sys: {
    country: string;
  };
  weather: WeatherData[];
};

export type ForecastData = {
  daily: DailyData[];
};

export type DailyData = {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherData[];
};

export type WeatherData = {
  description: string;
  icon: string;
};
