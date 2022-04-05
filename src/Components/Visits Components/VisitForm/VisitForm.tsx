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

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isUploading, setIsUploading] = React.useState(false);

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
      console.log("No se puede enviar, se necesita un nombre");
      return false;
    } else if (surname === "") {
      console.log("No se puede enviar, se necesita un apellido");
      return false;
    } else if (idType === "") {
      console.log("No se puede enviar, se necesita un tipo de identificación");
      return false;
    } else if (id === "") {
      console.log(
        "No se puede enviar, se necesita un numero de identificación"
      );
      return false;
    } else if (date === null) {
      console.log("No se puede enviar, se necesiata una fecha");
      return false;
    } else {
      console.log("se puede enviar");
      return true;
    }
  };

  React.useEffect(() => {
    validateUserState(navigate);
  }, []);

  return (
    <article className="visitForm">
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
            dateAdapter={AdapterDateFns}
            style={{
              width: "100%",
            }}
          >
            <MobileDatePicker
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
      {isUploading ? <Toast /> : ""}
    </article>
  );
};

export default VisitForm;
