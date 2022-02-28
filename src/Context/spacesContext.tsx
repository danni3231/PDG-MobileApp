import React, { useEffect } from "react";
import { space } from "../Types/space";

const spaces: space[] = [
  {
    name: "pool",
    img: `${process.env.PUBLIC_URL}/Img/pool.png`,
    id: "0",
  },
  {
    name: "pool2",
    img: `${process.env.PUBLIC_URL}/Img/pool.png`,
    id: "1",
  },
  {
    name: "pool3",
    img: `${process.env.PUBLIC_URL}/Img/pool.png`,
    id: "2",
  },
  {
    name: "pool4",
    img: `${process.env.PUBLIC_URL}/Img/pool.png`,
    id: "3",
  },
];

export const SpacesContext = React.createContext(spaces);
