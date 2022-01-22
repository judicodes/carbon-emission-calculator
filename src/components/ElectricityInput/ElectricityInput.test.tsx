import { render, screen } from "@testing-library/react";
import React from "react";
import ElectricityInput from "./ElectricityInput";

beforeEach(() => {
  render(<ElectricityInput />);
});

describe("Location Input", () => {
  it("renders Location Input", () => {
    expect(
      screen.getByLabelText("Location (Country)", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Electricity Usage Input", () => {
  it("renders Electricity Usage Input", () => {
    expect(
      screen.getByLabelText("Electricity Usage", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Unit Selection", () => {
  it("renders Unit select", () => {
    expect(
      screen.getByLabelText("Unit", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});
