import * as React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import "./NavBtn.css";

interface NavBtnProps {
  label: string;
  img: string;
}

const NavBtn: React.FC<NavBtnProps> = ({ label, img }) => {
  let navigate = useNavigate();
  let path = useLocation().pathname.split("/");
  if (path[1] == "") {
    path[1] = "Inicio";
  }

  const handleIconClick = () => {
    if (label === "Inicio") {
      navigate("/");
    } else {
      navigate(label);
    }
  };

  return (
    <div
      onClick={handleIconClick}
      className={
        path[1].includes(label) ? "nav__btn nav__btn--active" : "nav__btn"
      }
    >
      <div className="nav__btn__dot" />

      <img
        className="nav__btn__img"
        src={`${process.env.PUBLIC_URL}/Icons/${img}.svg`}
        alt=""
      />
      <label className="nav__btn__label">{label}</label>
    </div>
  );
};

export default NavBtn;
