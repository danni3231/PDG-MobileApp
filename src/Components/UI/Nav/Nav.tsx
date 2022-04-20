import * as React from "react";
import "./Nav.css";
import NavBtn from "./NavBtn/NavBtn";
import { NavContext } from "../../../Context/NavContext";

interface NavProps {}

const Nav: React.FC<NavProps> = () => {
  const navOptions = React.useContext(NavContext);

  return (
    <nav className="nav">
      {navOptions.map((navOption, id) => {
        return <NavBtn key={id} label={navOption.label} img={navOption.img} />;
      })}
    </nav>
  );
};

export default Nav;
