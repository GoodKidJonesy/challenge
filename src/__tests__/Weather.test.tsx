import { render, waitFor } from "@testing-library/react";
import { Weather } from "../Components/Weather";
import userEvent from "@testing-library/user-event";

jest.mock("../Utilities/apiUtils", () => ({
  fetchCurrentWeather: async (city: string) => ({
    city,
    country: "DK",
    icon: "some-icon-url",
    temp: 15,
    feelsLike: 16,
  }),
}));

describe("Weather", () => {
  it("Renders Component According To Snapshot", () => {
    const { container } = render(<Weather />);

    expect(container).toMatchSnapshot();
  });

  it("City name is display", async () => {
    const city = "Copenhagen";
    const { getByText } = render(<Weather city={city} />);

    await waitFor(() => getByText("Copenhagen, DK"));

    expect(getByText("Copenhagen, DK")).toBeInTheDocument();
  });
  it("toggles the temperature unit between Celsius and Fahrenheit", async () => {
    const city = "Copenhagen";
    const { getByText } = render(<Weather city={city} />);
    await waitFor(() => getByText("Copenhagen, DK"));

    expect(getByText("15 °C")).toBeInTheDocument();

    userEvent.click(getByText("15 °C"));

    expect(getByText("59 °F")).toBeInTheDocument();
  });
});
