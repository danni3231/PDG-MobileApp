import styled from "@emotion/styled";
import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import * as React from "react";
import Btn from "../../Buttons/Btn";

interface VisitFormProps {}

const VisitForm: React.FC<VisitFormProps> = ({}) => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#7b61ff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7b61ff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "50px",
      },
      "&:hover fieldset": {
        borderColor: "#7b61ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7b61ff",
      },
    },
    "& .MuiButtonBase-root": {
      marginRight: "0px",
    },
  });

  return (
    <article>
      <h1>Información del visitante</h1>
      <p>Por favor, llena los siguientes campos</p>
      <div className="scroll scroll--h">
        <div className="scroll__column spaceList__column">
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

          <Btn text={"Confirmar"} variant={""} action={() => {}} />
          <Btn text={"Cancelar"} variant={"disabled"} action={() => {}} />
        </div>
      </div>
    </article>
  );
};

export default VisitForm;
