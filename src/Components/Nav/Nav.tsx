import * as React from "react";
import "./Nav.css";
import NavBtn from "./NavBtn/NavBtn";

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
            <NavBtn
                label="Inicio"
                img="home" />

            <NavBtn
                label="Visitas"
                img="calendar" />

            <NavBtn
                label="Reservas"
                img="place" />

            <NavBtn
                label="Social"
                img="chat" />
        </nav>
    );
};

export default Nav;