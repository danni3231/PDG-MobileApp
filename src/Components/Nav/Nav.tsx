import * as React from "react";
import "./Nav.css";
import NavBtn from "./NavBtn/NavBtn";
import { NavContext } from '../../Context/NavContext'

//import {useHistory} from "react-router";

interface NavProps { }

const Nav: React.FC<NavProps> = ({ }) => {
    /*
   const history = useHistory();

   const handleHomeClick: any = () => {
      history.push("/");
   };
   */

    const handleIconClick: any = () => {

    }

    return (
        <nav className="nav">

            {React.useContext(NavContext).map((navOption, id) => {
                return <NavBtn
                    key={id}
                    label={navOption.label}
                    img={navOption.img}
                    url={navOption.url} />
            })}
        </nav>
    );
};

export default Nav;