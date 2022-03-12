import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select } from "@mui/material";
import * as React from "react";
import { CustomTextField } from "../../../Utils/css";
import Btn from "../../Buttons/Btn";

import "./VisitForm.css";

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = ({}) => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [idType, setIdType] = React.useState("");
  const [id, setId] = React.useState("");

  return (
    <article className="visitForm">
      <img
        className="visitForm__back"
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        alt=""
      />
      <h1>Información del visitante</h1>
      <p>Por favor, llena los siguientes campos</p>
      <div className="scroll scroll--h">
        <div className="scroll__column visitForm__column">
          <CustomTextField placeholder="Nombre" onChange={() => {}} />
          <CustomTextField placeholder="Apellido" onChange={() => {}} />
          <Select
            value={idType}
            placeholder="Tipo de Documento"
            onChange={(event) => {
              setIdType(event.target.value);
            }}
          >
            <MenuItem value={"T.I"}>Tarjeta de Identidad</MenuItem>
            <MenuItem value={"C.C"}>Cédula de Ciudadanía</MenuItem>
          </Select>
          <CustomTextField placeholder="N° de Documento" onChange={() => {}} />

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
                <CustomTextField
                  placeholder="dd/mm/aaaa"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>

          <Btn text={"Confirmar"} variant="" margin="16px" action={() => {}} />
          <Btn text={"Cancelar"} variant={"disabled"} action={() => {}} />
        </div>
      </div>
    </article>
  );
};

export default VisitForm;
