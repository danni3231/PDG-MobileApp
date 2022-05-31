import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../../Firebase/firebaseApi";
import Btn from "../../UI/Buttons/Btn";
import Toast from "../../UI/Toast/Toast";

import "./Login.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [condominium, setCondominium] = React.useState<string>("");

  const [isLogin, setIsLogin] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const validateData = () => {
    if (email === "") {
      setErrorMsg("Falta ingresar tu correo");
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

  const handleSubmit = () => () => {
    if (validateData()) {
      setIsLogin(true);
      loginUser(email, password).catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setIsLogin(false);
        setErrorMsg(error.message);
        setError(true);
      });
    }
  };

  return (
    <article className="login">
      {isLogin ? (
        <Toast text="Ingresando a Urban, por favor espera" type="success" />
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
            label="Correo electrónico"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            label="Contraseña"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <FormControl>
            <InputLabel id="selectC-label">Selecciona tu conjunto</InputLabel>
            <Select
              value={condominium}
              labelId="selectC-label"
              id="selectC"
              //displayEmpty
              //renderValue={(v) => (v !== "" ? v : "Selecciona tu conjunto")}
              onChange={(event) => {
                setCondominium(event.target.value);
              }}
            >
              <MenuItem value={"Conjunto ICESI"}>Conjunto ICESI</MenuItem>
              <MenuItem value={"Guadalupe Alto"}>Guadalupe Alto</MenuItem>
              <MenuItem value={"El Coral"}>El Coral</MenuItem>
              <MenuItem value={"Boho U Living"}>Boho U Living</MenuItem>
            </Select>
          </FormControl>

          <Btn
            text="Iniciar sesión"
            variant=""
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
