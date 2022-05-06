import {
  LocalizationProvider,
  MobileDatePicker,
  MobileTimePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { es } from "date-fns/locale";
import * as React from "react";
import Btn from "../../UI/Buttons/Btn";

import "./CreateSpace.css";

interface CreateSpaceProps {}

const CreateSpace: React.FC<CreateSpaceProps> = ({}) => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const [name, setName] = React.useState("");
  const [occupation, setOccupation] = React.useState("");

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

  return (
    <article>
      <h1>Crear Spacio</h1>

      <TextField
        value={name}
        label="Nombre"
        onChange={(event) => setName(event.target.value)}
      />

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
          //displayEmpty
          //renderValue={(v) => (v !== "" ? v : "Selecciona tu conjunto")}
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
          //displayEmpty
          //renderValue={(v) => (v !== "" ? v : "Selecciona tu conjunto")}
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
        action={() => {}}
      />
    </article>
  );
};

export default CreateSpace;
