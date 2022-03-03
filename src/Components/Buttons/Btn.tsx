import * as React from "react";

import "./Btn.css";

interface BtnProps {
  text: string;
  variant: string;

  action: () => void;
}

const Btn: React.FC<BtnProps> = ({ text, variant, action }) => {
  const handleClick = () => {
    action();
  };

  switch (variant) {
    case "add":
      return (
        <button className="btn btn--add" onClick={handleClick}>
          {text}
        </button>
      );

    default:
      return (
        <button className="btn" onClick={handleClick}>
          {text}
        </button>
      );
  }
};

export default Btn;
