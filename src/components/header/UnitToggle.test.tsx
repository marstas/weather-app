import React from "react";
import { render, screen } from "@testing-library/react";
import UnitToggle from "./UnitToggle";

const onUnitChangeMock = jest.fn();

test("renders imperial values", () => {
  render(<UnitToggle system="imperial" isChecked={false} onUnitChange={onUnitChangeMock} />);

  const radio = screen.getByTestId("unit-radio") as HTMLInputElement;
  const label = screen.getByTestId("unit-label") as HTMLLabelElement;
  expect(radio.id).toBe("toggle-f");
  expect(radio.name).toBe("toggle-f");
  expect(label.htmlFor).toBe("toggle-f");
  expect(label.innerHTML).toBe(" ° F");
});

test("renders metric values", () => {
  render(<UnitToggle system="metric" isChecked={false} onUnitChange={onUnitChangeMock} />);

  const radio = screen.getByTestId("unit-radio") as HTMLInputElement;
  const label = screen.getByTestId("unit-label") as HTMLLabelElement;
  expect(radio.id).toBe("toggle-c");
  expect(radio.name).toBe("toggle-c");
  expect(label.htmlFor).toBe("toggle-c");
  expect(label.innerHTML).toBe(" ° C");
});
