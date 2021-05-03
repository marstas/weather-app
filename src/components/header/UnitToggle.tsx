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
  const inputName = isImperial ? "toggle-f" : "toggle-c";
  const labelText = ` ° ${isImperial ? "F" : "C"}`;

  return (
    <>
      <input
        data-testid={`unit-radio-${system}`}
        type="radio"
        id={inputName}
        name={inputName}
        onChange={(event) => onUnitChange(event)}
        checked={isChecked}
      />
      <label data-testid={`unit-label-${system}`} htmlFor={inputName}>
        {labelText}
      </label>
    </>
  );
}
