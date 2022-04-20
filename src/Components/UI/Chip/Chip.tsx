import * as React from "react";

import "./Chip.css";

interface ChipProps {
  text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => {

  return (
    <div className="chip">
      <img src="" alt="" />
      <p>{text}</p>
  </div>
  );
};

export default Chip;