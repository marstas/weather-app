import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import UnitToggle from "./UnitToggle";

test("Renders children correctly", () => {
  const children = [
    <UnitToggle key="1" system="metric" isChecked={true} onUnitChange={jest.fn()} />,
    <UnitToggle key="2" system="imperial" isChecked={false} onUnitChange={jest.fn()} />,
    <SearchBar
      key="3"
      input="foo"
      isDisabled={false}
      onSearchSubmit={jest.fn()}
      onSearchChange={jest.fn()}
    />
  ];

  render(<Header>{children}</Header>);

  const unitLabelMetric = screen.getByText(/° C/);
  const unitLabelImperial = screen.getByText(/° F/);
  const searchSubmit = screen.getByTitle("Search");
  expect(unitLabelMetric).toBeTruthy();
  expect(unitLabelImperial).toBeTruthy();
  expect(searchSubmit).toBeTruthy();
});
