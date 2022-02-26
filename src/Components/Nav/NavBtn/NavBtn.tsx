import * as React from "react";

import {NavLink as Rlink} from "react-router-dom";
import "./NavBtn.css";

//import {useHistory} from "react-router";

interface NavBtnProps { 
    label: string
    img: string
}

const NavBtn: React.FC<NavBtnProps> = ({label,img}) => {
    /*
   const history = useHistory();

   const handleHomeClick: any = () => {
      history.push("/");
   };
   */

    const handleIconClick: any = () => {

    }

    return (

        <div className="nav__btn">
            <label>
                .
            </label>
            <img className="nav__btn__img"
                src={`${process.env.PUBLIC_URL}/Icons/${img}.svg`}
                alt=""
                onClick={handleIconClick} />
            <label className="nav__btn__label">
               {label}
            </label>
        </div>

    );
};

export default NavBtn;