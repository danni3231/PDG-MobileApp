import * as React from "react";
import { NavOption } from "../Types/navOption";

const navOptions: NavOption[] =
    [
        {
            label: "Inicio",
            img: "home",
            url: "/"
        },
        {
            label: "Visitas",
            img: "calendar",
            url: "visitas"
        },
        {
            label: "Reservas",
            img: "place",
            url: "reservas"
        },
        {
            label: "Social",
            img: "chat",
            url: "social"
        }
    ]


export const NavContext = React.createContext(
    navOptions
);
