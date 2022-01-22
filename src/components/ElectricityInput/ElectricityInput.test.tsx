import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ElectricityInput from "./ElectricityInput";

describe("Location Input", () => {
  render(<ElectricityInput />);
  it("renders Location Input", () => {
    expect(
      screen.getByLabelText("Location (Country)", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows no error initially", () => {
    render(<ElectricityInput />);
    expect(
      screen.queryByText("Please select a location", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });

  it("shows an error message when no country is selected after user interaction", async () => {
    render(<ElectricityInput />);

    const inputElement = screen.getByLabelText("Location (Country)", {
      exact: false,
    });
    await userEvent.type(inputElement, "xyz");
    await userEvent.click(document.body);
    expect(
      screen.getByText("Please select a location", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Electricity Usage Input", () => {
  it("renders Electricity Usage Input", () => {
    render(<ElectricityInput />);
    expect(
      screen.getByLabelText("Electricity Usage", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows no error initially", async () => {
    render(<ElectricityInput />);
    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });

  it("shows an error on blur", async () => {
    render(<ElectricityInput />);
    await userEvent.click(
      screen.getByLabelText("Electricity Usage", {
        exact: false,
      })
    );
    await userEvent.click(document.body);
    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows no error when entering positive numbers", async () => {
    render(<ElectricityInput />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    await userEvent.type(electricityUsageInput, "35.789");

    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });

  it("should show an error when entering a non-numerical value", async () => {
    render(<ElectricityInput />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    await userEvent.type(electricityUsageInput, "abc");
    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("should show an error when entering negative numbers", async () => {
    render(<ElectricityInput />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    await userEvent.type(electricityUsageInput, "-5");
    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Unit Selection", () => {
  it("renders Unit select", () => {
    render(<ElectricityInput />);
    expect(
      screen.getByLabelText("Unit", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
