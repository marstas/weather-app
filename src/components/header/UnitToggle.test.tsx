import React from "react";
import { render, screen } from "@testing-library/react";
import { Units } from "../../models";
import UnitToggle from "./UnitToggle";

test.each([
  [Units.Imperial, true, "toggle-f", " ° F"],
  [Units.Metric, false, "toggle-c", " ° C"]
])(
  'Renders %s system elements with "checked" set to %s',
  (system, isChecked, toggleId, labelText) => {
    render(<UnitToggle system={system} isChecked={isChecked} onUnitChange={jest.fn()} />);

    const radio = screen.getByTestId(`unit-radio-${system}`) as HTMLInputElement;
    const label = screen.getByTestId(`unit-label-${system}`) as HTMLLabelElement;
    expect(radio.id).toBe(toggleId);
    expect(radio.name).toBe(toggleId);
    expect(radio.checked).toBe(isChecked);
    expect(label.htmlFor).toBe(toggleId);
    expect(label.innerHTML).toBe(labelText);
  }
);
