import { TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { uploadFile } from "../../../../Firebase/firebaseApi";
import { AppState } from "../../../../Redux/Reducers";
import Btn from "../../../UI/Buttons/Btn";
import Chip from "../../../UI/Chip/Chip";

import "./PQRForm.css";

interface PQRFormProps {}

const PQRForm: React.FC<PQRFormProps> = ({}) => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [file, setFile] = React.useState<File | null | undefined>();

  //toast manage
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const openGallery = () => {
    inputFile.current!.click();
  };

  const handleFile = () => {
    const file = inputFile.current?.files;
    setFile(file?.item(0)!);

    console.log(file);

    if (file) {
      console.log("yep");
      // imgPreview.current!.src = URL.createObjectURL(file.item(0)!);
    }
  };

  const validateData = () => {
    if (title === "") {
      setErrorMsg("Falta el titulo de la pqr");
      setError(true);
      return false;
    } else if (content === "") {
      setErrorMsg("Falta el texto de la pqr");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleUpload = () => {
    if (validateData()) {
      uploadFile(file!, currentUser.condominiumId, title);
    } else {
      console.log("bad");
    }
  };

  return (
    <article className="PQRForm">
      <Chip text="Crear PQRS" />
      <div className="scroll scroll--h PQRList__scroll">
        <div className="scroll__column PQRList__column">
          <TextField
            placeholder="Título"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            placeholder="Añade una descripción del asunto"
            multiline
            rows={10}
            onChange={(event) => {
              setContent(event.target.value);
            }}
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
            text={"Publicar"}
            variant=""
            margin="16px"
            action={handleUpload}
          />
        </div>
      </div>
    </article>
  );
};

export default PQRForm;
