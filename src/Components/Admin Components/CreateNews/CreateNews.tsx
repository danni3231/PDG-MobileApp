import { LocalizationProvider, MobileDatePicker } from "@mui/lab";
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
import { createNews, createSpace } from "../../../Firebase/firebaseApi";
import { news } from "../../../Types/news";
import {
  castCondominiumId,
  getTimeStamp,
} from "../../../Utils/GeneralFunctions";
import Btn from "../../UI/Buttons/Btn";
import Toast from "../../UI/Toast/Toast";
import "./CreateNews.css";

interface CreateNewsProps {}

const CreateNews: React.FC<CreateNewsProps> = ({}) => {
  const dispatch = useDispatch();

  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [condominium, setCondominium] = React.useState("");

  const [date, setDate] = React.useState<Date | null>(null);

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
    if (title === "") {
      setErrorMsg("Falta el nombre del espacio");
      setError(true);
      return false;
    } else if (content === "") {
      setErrorMsg("Falta el maximo de ocupación");
      setError(true);
      return false;
    } else if (condominium === "") {
      setErrorMsg("Falta seleccionar el conjunto");
      setError(true);
      return false;
    } else if (date === null) {
      setErrorMsg("Falta seleccionar la hora de apertura");
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

      const newNews: news = {
        title: title,
        img: "",
        content: content,
        id: "",
        date: getTimeStamp(date!!),
        writer: "Administración",
      };

      createNews(
        newNews,
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
        <Toast text="Subiendo la noticia, por favor espera" type="success" />
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

      <h1>Crear Noticia</h1>

      <div className="scroll scroll--h">
        <div className="scroll__column home__column">
          <TextField
            value={title}
            label="Titulo"
            onChange={(event) => setTitle(event.target.value)}
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

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MobileDatePicker
              label="Fecha"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            value={content}
            label="Contenido"
            multiline
            rows={10}
            onChange={(event) => setContent(event.target.value)}
          />

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
            text={"Agregar Noticia"}
            variant=""
            margin="16px"
            action={handleSubmit}
          />
        </div>
      </div>
    </article>
  );
};

export default CreateNews;
