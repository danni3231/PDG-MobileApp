import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../../Firebase/firebaseApi";
import Btn from "../../UI/Buttons/Btn";

import "./Login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [condominium, setCondominium] = React.useState<string>("");

  const validateData = () => {
    if (condominium === "") {
      // alert
      return false;
    } else if (email === "") {
      //alert
      return false;
    } else if (password === "") {
      //alert
      return false;
    } else {
      return true;
    }
  };

  const castCondominiumId = (condominium: string) => {
    switch (condominium) {
      case "Guadalupe alto":
        return "q4CPmR9IIHrA6k1H2SdS";

      case "El Coral":
        return "q4CPmR9IIHrA6k1H2SdS";

      case "Boho u living":
        return "q4CPmR9IIHrA6k1H2SdS";

      default:
        return "";
    }
  };

  const handleSubmit = () => () => {
    if (validateData()) {
      const condominiumId = castCondominiumId(condominium);
      loginUser(email, password, condominiumId, navigate, dispatch);
    }
  };

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
          <TextField
            placeholder="Correo electrónico"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            placeholder="Contraseña"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

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
            action={handleSubmit()}
          />
        </section>
        <p className="purple" onClick={() => navigate("/Registro")}>
          ¿No tienes una cuenta? <b>Registrate</b>
        </p>
      </section>
    </article>
  );
};

export default Login;
