import * as React from "react";
import { useNavigate } from "react-router";
import { goBack } from "../../../Utils/GeneralFunctions";

import "./Chip.css";

interface ChipProps {
  text: string;
  padding?: boolean;
}

const Chip: React.FC<ChipProps> = ({ text, padding }) => {
  const navigate = useNavigate();

  return (
    <div className={padding ? "chip chip--padding" : "chip"}>
      <img
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        onClick={() => goBack(navigate)}
        alt=""
      />
      <p>{text}</p>
    </div>
  );
};

export default Chip;
