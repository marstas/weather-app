import React from "react";
import { isValidSearchInput } from "../../utils";
import { Units } from "../../models";
import SearchBar from "./SearchBar";
import UnitToggle from "./UnitToggle";

type HeaderProps = {
  units: Units;
  searchInput: string;
  handleUnitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function Header({
  units,
  searchInput,
  handleUnitChange,
  handleSearchChange,
  handleSearchSubmit
}: HeaderProps): JSX.Element {
  return (
    <header>
      <div className="units-radio-wrapper">
        <UnitToggle
          system="imperial"
          isChecked={units === Units.Imperial}
          onUnitChange={handleUnitChange}
        />
        <UnitToggle
          system="metric"
          isChecked={units === Units.Metric}
          onUnitChange={handleUnitChange}
        />
      </div>
      <SearchBar
        input={searchInput}
        isDisabled={!isValidSearchInput(searchInput)}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
    </header>
  );
}
