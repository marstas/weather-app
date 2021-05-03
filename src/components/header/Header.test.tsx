import React from "react";
import { render, screen } from "@testing-library/react";
import { Units } from "../../models";
import Header from "./Header";

test("Renders child components correctly", () => {
  render(
    <Header
      units={Units.Imperial}
      searchInput="foo"
      handleUnitChange={jest.fn()}
      handleSearchChange={jest.fn()}
      handleSearchSubmit={jest.fn()}
    />
  );

  const unitLabelMetric = screen.getByText(/° C/) as HTMLInputElement;
  const unitLabelImperial = screen.getByText(/° F/) as HTMLInputElement;
  const searchSubmit = screen.getByTitle("Search");
  expect(unitLabelMetric).toBeTruthy();
  expect(unitLabelImperial).toBeTruthy();
  expect(searchSubmit).toBeTruthy();
});

test.each([Units.Metric, Units.Imperial])("%s unit system is passed down correctly", (system) => {
  render(
    <Header
      units={system}
      searchInput="foo"
      handleUnitChange={jest.fn()}
      handleSearchChange={jest.fn()}
      handleSearchSubmit={jest.fn()}
    />
  );

  const radioMetric = screen.getByTestId("unit-radio-metric") as HTMLInputElement;
  const radioImperial = screen.getByTestId("unit-radio-imperial") as HTMLInputElement;
  expect(radioMetric.checked).toBe(system === "metric");
  expect(radioImperial.checked).toBe(system === "imperial");
});

test.each([
  "Qarālar-e Mīrzā Ḩoseynqolī",
  "Āzādshahr",
  "San Felipe Torres Mochas [Ganadería]",
  "Zürich (Kreis 7) / Witikon"
])("Valid input is allowed (%s)", (input) => {
  render(
    <Header
      units={Units.Imperial}
      searchInput={input}
      handleUnitChange={jest.fn()}
      handleSearchChange={jest.fn()}
      handleSearchSubmit={jest.fn()}
    />
  );

  const searchSubmit = screen.getByTestId("search-submit") as HTMLInputElement;
  expect(searchSubmit.disabled).toBeFalsy();
});

test.each(["", "foo!", "#bar", "baz&"])("Invalid input is not allowed (%s)", (input) => {
  render(
    <Header
      units={Units.Imperial}
      searchInput={input}
      handleUnitChange={jest.fn()}
      handleSearchChange={jest.fn()}
      handleSearchSubmit={jest.fn()}
    />
  );

  const searchSubmit = screen.getByTestId("search-submit") as HTMLInputElement;
  expect(searchSubmit.disabled).toBeTruthy();
});
