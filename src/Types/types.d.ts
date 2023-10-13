export type City = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

export type WeatherInfo = {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  icon: string;
  wind: {
    deg: number;
    speed: number;
  };
};
