import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as React from "react";
import { CustomTextField } from "../../../utils/css";
import Btn from "../../Buttons/Btn";

import "./VisitForm.css";

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = ({}) => {
  const [date, setDate] = React.useState<Date | null>(new Date());

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
          <CustomTextField
            placeholder="Tipo de Documento"
            onChange={() => {}}
          />
          <CustomTextField placeholder="No. de Documento" onChange={() => {}} />
          <CustomTextField placeholder="nombre" onChange={() => {}} />

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
