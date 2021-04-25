import React from "react";

type SearchBarProps = {
  input: string;
  disabled: boolean;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  input,
  disabled,
  onSearchChange,
  onSearchSubmit
}: SearchBarProps): JSX.Element {
  return (
    <form onSubmit={onSearchSubmit}>
      <input
        className="search-input"
        type="search"
        placeholder="Enter city name..."
        value={input}
        spellCheck="false"
        onChange={(event) => onSearchChange(event)}
      />
      <input
        className="search-submit"
        type="submit"
        value="Search"
        disabled={disabled}
        title={disabled ? "Numbers and special characters are not allowed" : "Search"}
      />
    </form>
  );
}
