import { LocalizationProvider, MobileTimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createSpace } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import {
  castCondominiumId,
  getTimeStamp,
} from "../../../Utils/GeneralFunctions";
import Btn from "../../UI/Buttons/Btn";
import Toast from "../../UI/Toast/Toast";

import "./CreateSpace.css";

interface CreateSpaceProps {}

const CreateSpace: React.FC<CreateSpaceProps> = ({}) => {
  const dispatch = useDispatch();

  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [name, setName] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [condominium, setCondominium] = React.useState("");

  const [dayStart, setDayStart] = React.useState("");
  const [dayEnd, setDayEnd] = React.useState("");

  const [hourEnd, setHourEnd] = React.useState<Date | null>(null);
  const [hourStart, setHourStart] = React.useState<Date | null>(null);

  const [file, setFile] = React.useState<File | null | undefined>();

  const openGallery = () => {
    inputFile.current!.click();
  };

  const handleFile = () => {
    const file = inputFile.current?.files;

    console.log(file);

    if (file) {
      setFile(file?.item(0)!);
      imgPreview.current!.src = URL.createObjectURL(file.item(0)!);
    }
  };

  const validateData = () => {
    if (name === "") {
      setErrorMsg("Falta el nombre del espacio");
      setError(true);
      return false;
    } else if (occupation === "") {
      setErrorMsg("Falta el maximo de ocupación");
      setError(true);
      return false;
    } else if (condominium === "") {
      setErrorMsg("Falta seleccionar el conjunto");
      setError(true);
      return false;
    } else if (dayStart === "") {
      setErrorMsg("Falta seleccionar el dia que abre el espacio");
      setError(true);
      return false;
    } else if (dayEnd === "") {
      setErrorMsg("Falta seleccionar el dia que cierra el espacio");
      setError(true);
      return false;
    } else if (hourEnd === null) {
      setErrorMsg("Falta seleccionar la hora de apertura");
      setError(true);
      return false;
    } else if (hourStart === null) {
      setErrorMsg("Falta seleccionar la hora de cierre");
      setError(true);
      return false;
    } else if (file === null || file === undefined) {
      setErrorMsg("Falta Cargar la imagen del espacio");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = () => {
    if (validateData()) {
      setIsUploading(true);

      const newSpaces: space = {
        name: name,
        img: "",
        id: "",
        occupation: ~~occupation, //occupation,
        days: {
          end: dayEnd,
          start: dayStart,
        },
        schedule: {
          end: getTimeStamp(hourEnd!!),
          start: getTimeStamp(hourStart!!),
        },
      };

      createSpace(
        newSpaces,
        file!!,
        castCondominiumId(condominium),
        dispatch
      ).then(() => {
        setIsUploading(false);
      });
    }
  };

  return (
    <article>
      {isUploading ? (
        <Toast
          text="Subiendo la información del espacio, por favor espera"
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

      <h1>Crear Spacio</h1>

      <div className="scroll scroll--h">
        <div className="scroll__column home__column">
          <TextField
            value={name}
            label="Nombre"
            onChange={(event) => setName(event.target.value)}
          />

          <FormControl>
            <InputLabel id="selectC-label">Conjunto</InputLabel>
            <Select
              value={condominium}
              labelId="selectC-label"
              id="selectC"
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

          <TextField
            value={occupation}
            label="Ocupación maxima"
            onChange={(event) => setOccupation(event.target.value)}
          />

          <FormControl>
            <InputLabel id="selectDS-label">Dia de apertura</InputLabel>
            <Select
              value={dayStart}
              labelId="selectDS-label"
              id="selectDS"
              onChange={(event) => {
                setDayStart(event.target.value);
              }}
            >
              <MenuItem value={"Lunes"}>Lunes</MenuItem>
              <MenuItem value={"Martes"}>Martes</MenuItem>
              <MenuItem value={"Miércoles"}>Miércoles</MenuItem>
              <MenuItem value={"Jueves"}>Jueves</MenuItem>
              <MenuItem value={"Viernes"}>Viernes</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="selectDE-label">Dia de cierre</InputLabel>
            <Select
              value={dayEnd}
              labelId="selectDE-label"
              id="selectDE"
              onChange={(event) => {
                setDayEnd(event.target.value);
              }}
            >
              <MenuItem value={"Lunes"}>Lunes</MenuItem>
              <MenuItem value={"Martes"}>Martes</MenuItem>
              <MenuItem value={"Miércoles"}>Miércoles</MenuItem>
              <MenuItem value={"Jueves"}>Jueves</MenuItem>
              <MenuItem value={"Viernes"}>Viernes</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileTimePicker
              label="Hora de apertura"
              value={hourStart}
              onChange={(newValue) => {
                setHourStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileTimePicker
              label="Hora de cierre"
              value={hourEnd}
              onChange={(newValue) => {
                setHourEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <input
            onChange={handleFile}
            type="file"
            id="file"
            ref={inputFile}
            style={{ display: "none" }}
          />

          <Btn text="+ Agregar foto" variant="add" action={openGallery} />

          <img ref={imgPreview} src="" alt="" />

          <Btn
            text={"Agregar Espacio"}
            variant=""
            margin="16px"
            action={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};

export default CreateSpace;
