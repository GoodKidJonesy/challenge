import React, { useLayoutEffect, useRef, useState } from "react";
import { WeatherInfo } from "../Types/types";
import { fetchCurrentWeather } from "../Utilities/apiUtils";
import "../Styles/App.css";

const Weather = (props: { city?: string }) => {
  const [info, setInfo] = useState<WeatherInfo>();
  const [isCelsius, setIsCelsius] = useState(true); // Track the temperature unit

  const isPending = useRef(false);

  const updateWeather = async (city: string) => {
    isPending.current = true;
    const weather = await fetchCurrentWeather(city);
    setInfo(weather || undefined);
    isPending.current = false;
  };

  useLayoutEffect(() => {
    if (props.city && isPending.current === false) {
      updateWeather(props.city);
    }
  }, [props.city]);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const getFahrenheit = (temp: number) => {
    if (isCelsius) {
      return Math.round(temp) + " °C";
    } else {
      const tempFahrenheit = (temp * 9) / 5 + 32;
      return Math.round(tempFahrenheit) + " °F";
    }
  };

  return info ? (
    <div className="weather-container">
      <h1 className="city-name">{info.city + ", " + info.country}</h1>
      <img className="weather-icon" src={info.icon} alt="Icon" />
      <p className="temperature" onClick={toggleTemperatureUnit}>
        {getFahrenheit(info.temp)}
      </p>
      <p
        className="feels-like"
        onClick={toggleTemperatureUnit}
      >{`( Feels Like: ${getFahrenheit(info.feelsLike)} )`}</p>
    </div>
  ) : null;
};

export { Weather };
