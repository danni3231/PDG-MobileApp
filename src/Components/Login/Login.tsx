import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import Btn from "../Buttons/Btn";

import "./Login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [condominium, setCondominium] = React.useState<string>("");

  return (
    <article className="login">
      <section className="login__header">
        <img
          className="login__header__img"
          src={`${process.env.PUBLIC_URL}/Icons/logos/logo__large.svg`}
          alt="logo__large.svg"
        />
      </section>
      <section className="login__form__container">
        <h1 className="purple">Iniciar Sesión</h1>
        <section className="login__form">
          <TextField placeholder="Número de documento" />
          <TextField placeholder="Contraseña" />
          <Select
            value={condominium}
            displayEmpty
            renderValue={(v) => (v !== "" ? v : "Selecciona tu conjunto")}
            onChange={(event) => {
              setCondominium(event.target.value);
            }}
          >
            <MenuItem value={"Guadalupe alto"}>Guadalupe alto</MenuItem>
            <MenuItem value={"El Coral"}>El Coral</MenuItem>
            <MenuItem value={"Boho u living"}>Boho u living</MenuItem>
          </Select>

          <Btn
            text={"Iniciar sesión"}
            variant={""}
            margin="18px"
            action={() => {}}
          ></Btn>
        </section>
        <p className="purple">
          ¿No tienes una cuenta? <b>Registrate</b>{" "}
        </p>
      </section>
    </article>
  );
};

export default Login;
