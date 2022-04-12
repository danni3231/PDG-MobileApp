import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router";

import Btn from "../../UI/Buttons/Btn";
import { visitor } from "../../../Types/visitor";

import "./VisitForm.css";
import {
  uploadVisitor,
  validateUserState,
} from "../../../Firebase/firebaseApi";
import { useDispatch } from "react-redux";
import Toast from "../../UI/Toast/Toast";
import { es } from "date-fns/locale";

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //toast manage
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [date, setDate] = React.useState<Date | null>(null);
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [idType, setIdType] = React.useState("");
  const [id, setId] = React.useState("");

  const goBack = () => () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    if (validateData()) {
      setIsUploading(true);

      let dateParse = parseInt((date!.getTime() / 1000).toFixed(0));

      const visitor: visitor = {
        name: `${name} ${surname}`,
        id: "",
        date: dateParse,
        ccType: idType,
        cc: ~~id,
      };

      console.log(visitor);

      uploadVisitor(visitor, dispatch).then(() => {
        navigate("/Visitas", { state: { reload: true } });
      });
    }
  };

  const validateData = () => {
    if (name === "") {
      setErrorMsg("Falta el nombre del visitante");
      setError(true);
      return false;
    } else if (surname === "") {
      setErrorMsg("Falta el apellido del visitante");
      setError(true);
      return false;
    } else if (idType === "") {
      setErrorMsg("Falta el tipo de identificación del visitante");
      setError(true);
      return false;
    } else if (id === "") {
      setErrorMsg("Falta el numero de identificación del visitante");
      setError(true);
      return false;
    } else if (date === null) {
      setErrorMsg("Falta la fecha de visita");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <article className="visitForm">
      {isUploading ? (
        <Toast
          text="Subiendo la información del visitante, por favor espera"
          type="success"
        />
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

      <img
        className="visitForm__back"
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        onClick={goBack()}
        alt=""
      />
      <h1>Información del visitante</h1>
      <p>Por favor, llena los siguientes campos</p>
      <div className="scroll scroll--h">
        <div className="scroll__column visitForm__column">
          <TextField
            placeholder="Nombre"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            placeholder="Apellido"
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
          <Select
            value={idType}
            displayEmpty
            renderValue={(v) => (v !== "" ? v : "Tipo de Documento")}
            defaultValue="none"
            onChange={(event) => {
              setIdType(event.target.value);
            }}
          >
            <MenuItem value={"Tarjeta de Identidad"}>
              Tarjeta de Identidad
            </MenuItem>
            <MenuItem value={"Cédula de Ciudadanía"}>
              Cédula de Ciudadanía
            </MenuItem>
          </Select>
          <TextField
            placeholder="N° de Documento"
            type="number"
            onChange={(event) => {
              setId(event.target.value);
            }}
          />

          <h2>Fecha de visita</h2>
          <LocalizationProvider
            locale={es}
            dateAdapter={AdapterDateFns}
            style={{
              width: "100%",
            }}
          >
            <MobileDatePicker
              minDate={new Date()}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="mm/dd/aaaa"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Btn
            text={"Confirmar"}
            variant=""
            margin="16px"
            action={handleSubmit}
          />
          <Btn text={"Cancelar"} variant={"disabled"} action={() => {}} />
        </div>
      </div>
    </article>
  );
};

export default VisitForm;
