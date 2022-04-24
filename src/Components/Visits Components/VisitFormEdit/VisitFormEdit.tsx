import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { useNavigate, useParams } from "react-router";

import Btn from "../../UI/Buttons/Btn";
import { visitor } from "../../../Types/visitor";

import "./VisitFormEdit.css";
import { removeVisit, updateVisit } from "../../../Firebase/firebaseApi";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../UI/Toast/Toast";
import { es } from "date-fns/locale";
import { AppState } from "../../../Redux/Reducers";
import { booking } from "../../../Types/booking";
import Chip from "../../UI/Chip/Chip";

interface VisitFormEditProps {}

const VisitFormEdit: React.FC<VisitFormEditProps> = () => {
  const { id } = useParams();

  const visitState = useSelector<AppState, visitor | undefined>((state) =>
    state.visits.find((visit) => visit.id === id!)
  );

  const [visit, setVisit] = React.useState(visitState!);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  //toast manage
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const dateParse = new Date(visit.date * 1000);
  const ccParse = visit.cc.toString();

  const [date, setDate] = React.useState<Date | null>(dateParse);
  const [name, setName] = React.useState(visit.name);
  const [surname, setSurname] = React.useState(visit.name);
  const [idType, setIdType] = React.useState(visit.ccType);
  const [idVisitor, setIdVisitor] = React.useState(ccParse);

  const handleEdit = () => {
    if (validateData()) {
      setIsUploading(true);

      let dateParse = parseInt((date!.getTime() / 1000).toFixed(0));

      const visitor: visitor = {
        id: visit.id,
        userId: currentUser.id,
        name: `${name} ${surname}`,
        date: dateParse,
        ccType: idType,
        cc: ~~idVisitor,
      };

      updateVisit(visitor, currentUser.condominiumId, dispatch).then(() => {
        navigate("/Visitas", { state: { reload: true } });
      });
    }
  };

  const handleDelete = () => {
    setIsDeleting(true);
    const idCache = visit.id;
    setVisit({
      id: "",
      userId: "",
      name: "",
      date: 0,
      ccType: "",
      cc: 0,
    });
    removeVisit(idCache, currentUser.condominiumId, dispatch, navigate).then(
      () => {
        navigate("/Visitas");
      }
    );
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
    } else if (idVisitor === "") {
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
    <article className="visitFormEdit">
      {isUploading ? (
        <Toast
          text="Editando la información del visitante, por favor espera"
          type="success"
        />
      ) : (
        ""
      )}

      {isDeleting ? (
        <Toast
          text="Eliminando la información del visitante, por favor espera"
          type="error"
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

      <Chip text="Visitas" />
      <h1>Información del visitante</h1>
      <p>Por favor, edita los siguientes campos</p>
      <div className="scroll scroll--h">
        <div className="scroll__column visitFormEdit__column">
          <TextField
            value={name}
            placeholder="Nombre"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            value={surname}
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
            value={idVisitor}
            placeholder="N° de Documento"
            type="number"
            onChange={(event) => {
              setIdVisitor(event.target.value);
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
            action={handleEdit}
          />
          <Btn text={"Eliminar"} variant={"disabled"} action={handleDelete} />
        </div>
      </div>
    </article>
  );
};

export default VisitFormEdit;
