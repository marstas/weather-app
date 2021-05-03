import React from "react";

type SearchBarProps = {
  input: string;
  isDisabled: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  input,
  isDisabled,
  onSearchChange,
  onSearchSubmit
}: SearchBarProps): JSX.Element {
  return (
    <form onSubmit={onSearchSubmit}>
      <input
        data-testid="search-input"
        className="search-input"
        type="search"
        placeholder="Enter city name..."
        value={input}
        spellCheck="false"
        onChange={(event) => onSearchChange(event)}
      />
      <input
        data-testid="search-submit"
        className="search-submit"
        type="submit"
        value="Search"
        disabled={isDisabled}
        title={isDisabled ? "Forbidden characters detected" : "Search"}
      />
    </form>
  );
}
