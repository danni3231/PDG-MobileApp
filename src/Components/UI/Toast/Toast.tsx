import Alert from "@mui/material/Alert";
import * as React from "react";

import "./Toast.css";

interface ToastProps {
  text: string;
  type: "error" | "warning" | "info" | "success";
  btn?: boolean;
  closeAction?: () => void;
}

const Toast: React.FC<ToastProps> = ({ text, type, btn, closeAction }) => {
  return (
    <section className="toast">
      {btn ? (
        <Alert variant="filled" severity={type} onClose={closeAction}>
          {text}
        </Alert>
      ) : (
        <Alert variant="filled" severity={type}>
          {text}
        </Alert>
      )}
    </section>
  );
};

export default Toast;
