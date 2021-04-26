import React from "react";

type UnitToggleProps = {
  system: string;
  isChecked: boolean;
  onUnitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UnitToggle({
  system,
  isChecked,
  onUnitChange
}: UnitToggleProps): JSX.Element {
  const isImperial = system === "imperial";
  const id = isImperial ? "toggle-f" : "toggle-c";

  return (
    <>
      <input
        data-testid="unit-radio"
        type="radio"
        id={id}
        name={id}
        onChange={(event) => onUnitChange(event)}
        checked={isChecked}
      />
      <label data-testid="unit-label" htmlFor={id}>{` ° ${isImperial ? "F" : "C"}`}</label>
    </>
  );
}
