import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ElectricityInput from "./ElectricityInput";

const onSubmitMock = jest.fn();

describe("Location Input", () => {
  render(<ElectricityInput onSubmitClick={onSubmitMock} />);
  it("renders Location Input", () => {
    expect(
      screen.getByLabelText("Location (Country)", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows no error initially", () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    expect(
      screen.queryByText("Please select a location", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });

  it("shows an error message when no country is selected after user interaction", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);

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
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    expect(
      screen.getByLabelText("Electricity Usage", {
        exact: false,
      })
    ).toBeInTheDocument();
  });

  it("shows no error initially", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    expect(
      screen.queryByText("Please enter a positive number", {
        exact: false,
      })
    ).not.toBeInTheDocument();
  });

  it("shows an error on blur", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
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
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
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

  it("shows an error when entering a non-numerical value", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
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

  it("shows an error when entering negative numbers", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
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
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    expect(
      screen.getByLabelText("Unit", {
        exact: false,
      })
    ).toBeInTheDocument();
  });
});

describe("Submit Button", () => {
  it("renders a Submit Button", () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    const button = screen.getByText("Submit", { selector: "button" });
    expect(button).toBeInTheDocument();
  });

  it("is disabled when the country selection is invalid", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    const countrySelectElement = screen.getByLabelText("Location (Country)", {
      exact: false,
    });
    await userEvent.type(electricityUsageInput, "5");
    await userEvent.type(countrySelectElement, "xyz");
    await userEvent.click(document.body);

    const button = screen.getByText("Submit", { selector: "button" });
    expect(button).toBeDisabled();
  });

  it("is disabled when the electricity usage input is invalid", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    const countrySelectElement = screen.getByLabelText("Location (Country)", {
      exact: false,
    });
    await userEvent.type(countrySelectElement, "cana");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(electricityUsageInput, "iaminvalid");

    const button = screen.getByText("Submit", { selector: "button" });
    expect(button).toBeDisabled();
  });

  it("is enabled when both inputs are valid", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    const countrySelectElement = screen.getByLabelText("Location (Country)", {
      exact: false,
    });
    await userEvent.type(countrySelectElement, "canada");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(electricityUsageInput, "56");

    const button = screen.getByText("Submit", { selector: "button" });
    expect(button).toBeEnabled();
  });

  it("calls the submit function with the correct input data", async () => {
    render(<ElectricityInput onSubmitClick={onSubmitMock} />);
    const electricityUsageInput = screen.getByLabelText("Electricity Usage", {
      exact: false,
    });
    const countrySelectElement = screen.getByLabelText("Location (Country)", {
      exact: false,
    });

    await userEvent.type(countrySelectElement, "canada");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await userEvent.type(electricityUsageInput, "1234.56");

    const button = screen.getByText("Submit", { selector: "button" });
    await userEvent.click(button);
    expect(onSubmitMock).toHaveBeenCalledWith({
      countryCode: "ca",
      electricityUsage: 1234.56,
      unit: "kwh",
    });
  });
});
