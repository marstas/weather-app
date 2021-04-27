import React from "react";

type HeaderProps = {
  children: React.ReactNode[];
};

export default function Header({ children }: HeaderProps): JSX.Element {
  return (
    <header>
      <div className="units-radio-wrapper">
        {children[0]}
        {children[1]}
      </div>
      {children[2]}
    </header>
  );
}
