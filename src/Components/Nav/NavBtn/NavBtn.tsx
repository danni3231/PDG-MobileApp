import * as React from "react";

import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import "./NavBtn.css";

//import {useHistory} from "react-router";

interface NavBtnProps {
    label: string
    img: string
    url: string
}

const NavBtn: React.FC<NavBtnProps> = ({ label, img, url }) => {

    let navigate = useNavigate();
    let resolved = useResolvedPath(url);
    let match = useMatch({ path: resolved.pathname, end: true });

    const handleIconClick = () => {
        if (label === "Inicio") {
            navigate("/")
        } else {
            navigate(label)
        }
    }

    return (

        <div onClick={handleIconClick} className={match ? "nav__btn nav__btn--active" : "nav__btn"}>

            <div className="nav__btn__dot" />

            <img className="nav__btn__img"
                src={`${process.env.PUBLIC_URL}/Icons/${img}.svg`}
                alt="" />
            <label className="nav__btn__label">
                {label}
            </label>
        </div>

    );
};

export default NavBtn;