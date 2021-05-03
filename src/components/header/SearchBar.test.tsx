import React from "react";
import { render, screen } from "@testing-library/react";
import SearchBar from "./SearchBar";

test.each([
  ["foo", false, "Search"],
  ["bar", true, "Forbidden characters detected"]
])("Renders with correct attribute values", (input, isDisabled, title) => {
  render(
    <SearchBar
      input={input}
      isDisabled={isDisabled}
      onSearchSubmit={jest.fn()}
      onSearchChange={jest.fn()}
    />
  );

  const searchInput = screen.getByTestId("search-input") as HTMLInputElement;
  const searchSubmit = screen.getByTestId("search-submit") as HTMLInputElement;
  expect(searchInput.value).toBe(input);
  expect(searchSubmit.disabled).toBe(isDisabled);
  expect(searchSubmit.title).toBe(title);
});
