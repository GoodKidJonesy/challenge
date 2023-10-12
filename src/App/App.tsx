import React from "react";

import { Weather } from "./Weather";

import type { FC } from "react";

import "./app.css";

export const App: FC = () => {
  const [input, setInput] = React.useState<string>("");

  const [city, setCity] = React.useState<string>("");

  const doStuff = (event: React.ChangeEvent<HTMLInputElement>) =>
    setInput(event.target.value);

  return (
    <>
      <input role="search" type="text" value={input} onChange={doStuff} />

      <button onClick={() => setCity(input)}>Show Weather</button>

      <Weather city={city} />
    </>
  );
};
