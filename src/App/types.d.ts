export type City = {
  country: string;
  lat: number;
  lon: number;
  name: string;
};

export type WeatherInfo = {
  city: string;
  temp: number;
  icon: string;
};
