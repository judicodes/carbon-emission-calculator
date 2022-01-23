import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import React from "react";
import App from "./App";

jest.mock("./components/ElectricityInput/ElectricityInput");
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Carbon Interface API integration", () => {
  it("fetches the data from the API", async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    await waitFor(() => render(<App />));
    expect(mockedAxios.get).toHaveBeenCalled();
  });

  it("sends a request to the API when Submit button is clicked", async () => {
    mockedAxios.post.mockImplementation(() => Promise.resolve({ data: {} }));
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    await waitFor(() => render(<App />));
    await waitFor(() =>
      userEvent.click(screen.getByTestId("submit-button-mock"))
    );
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.get).toHaveBeenCalled();
  });
});

describe("Carbon Emission Chart", () => {
  it("renders the chart when there is data available", async () => {
    const mockResponse = [
      {
        data: {
          id: "afe5ed13-e527-449b-8ac6-efd973509645",
          type: "estimate",
          attributes: {
            country: "de",
            state: null,
            electricity_unit: "kwh",
            electricity_value: 45,
            estimated_at: "2022-01-23T16:10:48.590Z",
            carbon_g: 13545,
            carbon_lb: 29.86,
            carbon_kg: 13.55,
            carbon_mt: 0.01,
          },
        },
      },
    ];
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({ data: mockResponse })
    );
    await waitFor(() => render(<App />));
    expect(screen.getByTestId("carbon-emission-chart")).toBeInTheDocument();
  });

  it("does not render the chart when there is no data available", async () => {
    mockedAxios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    await waitFor(() => render(<App />));
    expect(
      screen.queryByTestId("carbon-emission-chart")
    ).not.toBeInTheDocument();
  });
});
