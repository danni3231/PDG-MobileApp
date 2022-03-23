import * as React from "react";

import "./Header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="header">
      <img
        className="header__burger"
        src={`${process.env.PUBLIC_URL}/Icons/BurguerMenu.svg`}
        alt=""
      />
    </header>
  );
};

export default Header;
