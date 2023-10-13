import React from "react";
import { Weather } from "./Components/Weather";
import "./Styles/App.css";

const App = () => {
  const [theme, setTheme] = React.useState("dark");
  const [input, setInput] = React.useState("");
  const [city, setCity] = React.useState("");

  const buttonLabels = {
    toggleTheme: "Toggle Theme",
    showWeather: "Show Weather",
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  return (
    <div className="App" id={theme}>
      <div className="container">
        <button className="theme-toggle" onClick={toggleTheme}>
          {buttonLabels.toggleTheme}
        </button>
        <div className="card">
          <input
            className="city-input"
            role="search"
            type="text"
            placeholder="Enter a city"
            value={input}
            onChange={updateInputValue}
          />

          <Weather city={city} />

          <button
            className="show-weather-button"
            onClick={() => setCity(input)}
          >
            {buttonLabels.showWeather}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
