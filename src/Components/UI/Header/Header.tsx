import * as React from "react";
import SideTab from "../SideTab/SideTab";

import "./Header.css";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [modal, setModal] = React.useState(false);

  return (
    <header className="header">
      <img
        className="header__burger"
        src={`${process.env.PUBLIC_URL}/Icons/BurguerMenu.svg`}
        onClick={() => setModal(true)}
        alt=""
      />

      {modal ? <SideTab action={() => setModal(false)} /> : ""}
    </header>
  );
};

export default Header;
