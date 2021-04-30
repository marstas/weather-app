import React from "react";
import { render, screen } from "@testing-library/react";
import UnitToggle from "./UnitToggle";

const onUnitChangeMock = jest.fn();

test.each([
  ["imperial", "toggle-f", " ° F"],
  ["metric", "toggle-c", " ° C"]
])("renders %s system elements", (unitSystem, toggleId, labelText) => {
  render(<UnitToggle system={unitSystem} isChecked={false} onUnitChange={onUnitChangeMock} />);

  const radio = screen.getByTestId("unit-radio") as HTMLInputElement;
  const label = screen.getByTestId("unit-label") as HTMLLabelElement;
  expect(radio.id).toBe(toggleId);
  expect(radio.name).toBe(toggleId);
  expect(label.htmlFor).toBe(toggleId);
  expect(label.innerHTML).toBe(labelText);
});
