import * as React from "react";

import "./Btn.css";

interface BtnProps {
  text: string;
  variant: string;
  margin?: string;

  action: () => void;
}

const Btn: React.FC<BtnProps> = ({ text, variant, action, margin }) => {
  const handleClick = () => {
    action();
  };

  let styles: React.CSSProperties = {};

  if (margin !== undefined) {
    styles = { ...styles, marginTop: margin };
  }

  let classname = "";

  switch (variant) {
    case "add":
      classname = "btn btn--add";
      break;

    case "disabled":
      classname = "btn btn--disabled";
      break;

    default:
      classname = "btn";
  }

  return (
    <button className={classname} style={styles} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Btn;
