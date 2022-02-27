import * as React from "react";
import { navOption } from "../Types/navOption";

const navOptions: navOption[] =
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
