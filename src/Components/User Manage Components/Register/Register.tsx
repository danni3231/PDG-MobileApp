import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser, validateUserInDB } from "../../../Firebase/firebaseApi";
import { castCondominiumId } from "../../../Utils/GeneralFunctions";
import Btn from "../../UI/Buttons/Btn";
import Toast from "../../UI/Toast/Toast";

import "../Login/Login.css";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [id, setId] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [condominium, setCondominium] = React.useState<string>("");

  const [isRegister, setIsRegister] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const validateInputs = () => {
    if (email === "") {
      setErrorMsg("Falta ingresar tu correo");
      setError(true);
      return false;
    } else if (id === "") {
      setErrorMsg("Falta ingresar tu numero de identificación");
      setError(true);
      return false;
    } else if (password === "") {
      setErrorMsg("Falta ingresar tu contraseña");
      setError(true);
      return false;
    } else if (condominium === "") {
      setErrorMsg("Falta seleccionar tu conjunto");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => async () => {
    if (validateInputs()) {
      const condominiumId = castCondominiumId(condominium);
      const exist = await validateUserInDB(id, condominiumId, dispatch);

      if (exist) {
        setIsRegister(true);
        registerUser(email, password, id, condominiumId, navigate).catch(
          (error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            setIsRegister(false);
            setErrorMsg(error.message);
            setError(true);
          }
        );
      } else {
        setErrorMsg("Tu identificación no aparece en la base de datos");
        setError(true);
      }
    }
  };

  return (
    <article className="register">
      {isRegister ? (
        <Toast text="Registrandose en Urban, por favor espera" type="success" />
      ) : (
        ""
      )}

      {error ? (
        <Toast
          text={errorMsg}
          type="error"
          btn
          closeAction={() => {
            setError(false);
          }}
        />
      ) : (
        ""
      )}
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
            <MenuItem value={"Guadalupe Alto"}>Guadalupe Alto</MenuItem>
            <MenuItem value={"El Coral"}>El Coral</MenuItem>
            <MenuItem value={"Boho U Living"}>Boho U Living</MenuItem>
          </Select>

          <Btn
            text="Registrarse"
            variant=""
            margin="18px"
            action={handleSubmit()}
          />
        </section>
        <p className="purple" onClick={() => navigate("/")}>
          ¿Ya tienes una cuenta? <b>Inicia sesión</b>
        </p>
      </section>
    </article>
  );
};

export default Register;
