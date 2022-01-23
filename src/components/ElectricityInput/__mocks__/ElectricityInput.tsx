import React from "react";

export interface ElectricityInputValue {}

interface ElectricityInputProps {
  // eslint-disable-next-line no-unused-vars
  onSubmitClick(input: ElectricityInputValue): void;
}

function ElectricityInput({ onSubmitClick }: ElectricityInputProps) {
  return (
    <div>
      <button
        data-testid="submit-button-mock"
        type="button"
        onClick={onSubmitClick}
      >
        Submit
      </button>
    </div>
  );
}

export { ElectricityInput };
