import * as React from "react";
import { navOption } from "../Types/navOption";

const navOptions: navOption[] = [
  {
    label: "Inicio",
    img: "home",
  },
  {
    label: "Visitas",
    img: "calendar",
  },
  {
    label: "Reservas",
    img: "place",
  },
  {
    label: "Social",
    img: "chat",
  },
];

export const NavContext = React.createContext(navOptions);
