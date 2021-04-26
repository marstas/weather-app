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
  const name = isImperial ? "toggle-f" : "toggle-c";

  return (
    <>
      <input
        data-testid="unit-radio"
        type="radio"
        id={name}
        name={name}
        onChange={(event) => onUnitChange(event)}
        checked={isChecked}
      />
      <label data-testid="unit-label" htmlFor={name}>{` ° ${isImperial ? "F" : "C"}`}</label>
    </>
  );
}
