import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, validateUserInDB } from "../../../Firebase/firebaseApi";
import Btn from "../../UI/Buttons/Btn";

import "../Login/Login.css";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [condominium, setCondominium] = React.useState<string>("");

  const validateInputs = () => {
    if (condominium === "") {
      // alert
      console.log("falta condominio");
      return false;
    } else if (id === "") {
      //alert
      console.log("falta id");
      return false;
    } else if (password === "") {
      //alert
      console.log("falta contraseña");
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

  const handleSubmit = () => async () => {
    if (validateInputs()) {
      const condominiumId = castCondominiumId(condominium);
      const exist = await validateUserInDB(id, condominiumId, dispatch);

      if (exist) {
        // registerUser(email, password, navigate, dispatch);
      } else {
        console.log("Tu identificación no aparece en la base de datos");
      }
    }
  };

  return (
    <article className="register">
      <section className="register__header">
        <img
          className="register__header__img"
          src={`${process.env.PUBLIC_URL}/Icons/logos/logo__large.svg`}
          alt="logo__large.svg"
        />
      </section>
      <section className="register__form__container">
        <h1 className="purple">Registrarse</h1>
        <section className="register__form">
          <TextField
            placeholder="Correo electrónico"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            placeholder="Número de documento"
            type="number"
            onChange={(event) => {
              setId(event.target.value);
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
          ></Btn>
        </section>
        <p className="purple" onClick={() => navigate("/")}>
          ¿Ya tienes una cuenta? <b>Inicia sesión</b>
        </p>
      </section>
    </article>
  );
};

export default Register;
