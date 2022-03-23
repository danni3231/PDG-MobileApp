import Alert from "@mui/material/Alert";
import * as React from "react";

import "./Toast.css";

interface ToastProps {}

const Toast: React.FC<ToastProps> = () => {
  return (
    <section className="toast">
      <Alert variant="filled">Subiendo la informacion, por favor espera</Alert>
    </section>
  );
};

export default Toast;
