import { City, WeatherInfo } from "../Types/types";

const apiKey = "4c4f0b1876954338598a7be96c66527b";
const baseUrl = "https://api.openweathermap.org";

const fetchCityCoordinatess = (city: string) => {
  return fetch(`${baseUrl}/geo/1.0/direct?q=${city}&appid=${apiKey}`)
    .then((res) => res.json())
    .then((data: City[]) => {
      return data[0];
    })
    .catch(() => {
      return null;
    });
};

const fetchWeather = (city: City) => {
  return fetch(
    `${baseUrl}/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      return {
        city: city.name,
        country: city.country,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`,
      } as WeatherInfo;
    })
    .catch(() => {
      return null;
    });
};

export const fetchCurrentWeather = async (city: string) => {
  const cityCoords = await fetchCityCoordinatess(city);
  if (!cityCoords) {
    return null;
  }
  const weather = await fetchWeather(cityCoords);
  if (!weather) {
    return null;
  }
  return weather;
};
