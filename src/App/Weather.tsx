import React from "react";
import { City, WeatherInfo } from "./types";

const Weather = (props: { city?: string }) => {
  const [info, setInfo] = React.useState<WeatherInfo>();

  const isPending = React.useRef(false);

  const fetchCityCoordinatess = (city: string) => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=4c4f0b1876954338598a7be96c66527b`
    )
      .then((res) => res.json())
      .then((data: City[]) => {
        fetchWeather(data[0]);
      })
      .catch((err) => {
        console.log(err);
        isPending.current = false;
      });
  };

  const fetchWeather = (city: City) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=4c4f0b1876954338598a7be96c66527b`
    )
      .then((res) => res.json())
      .then((data) => {
        setInfo({
          city: data.name,
          temp: data.main.temp,
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isPending.current = false;
      });
  };

  const fetchCurrentWeather = (city: string) => {
    isPending.current = true;
    fetchCityCoordinatess(city);
  };

  React.useLayoutEffect(() => {
    if (props.city && isPending.current === false) {
      fetchCurrentWeather(props.city);
    }
  }, [props.city]);

  return info ? (
    <>
      <h1>{info.city}</h1>

      <p>{~~info.temp} Celcius</p>

      <img src={info.icon} alt="Icon" />
    </>
  ) : null;
};

export { Weather };
