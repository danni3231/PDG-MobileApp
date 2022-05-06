import { TextField } from "@mui/material";
import id from "date-fns/esm/locale/id/index.js";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadPqr,
  uploadPqrWithImage,
} from "../../../../Firebase/firebaseApi";
import { AppState } from "../../../../Redux/Reducers";
import { pqr } from "../../../../Types/pqr";
import { getTimeStamp } from "../../../../Utils/GeneralFunctions";
import Btn from "../../../UI/Buttons/Btn";
import Chip from "../../../UI/Chip/Chip";
import Toast from "../../../UI/Toast/Toast";

import "./PQRForm.css";

interface PQRFormProps {}

const PQRForm: React.FC<PQRFormProps> = ({}) => {
  const dispatch = useDispatch();

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

    console.log(file);

    if (file) {
      setFile(file?.item(0)!);
      imgPreview.current!.src = URL.createObjectURL(file.item(0)!);
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
      setIsUploading(true);

      const pqr: pqr = {
        id: "",
        userId: currentUser.id,
        title: title,
        content: content,
        date: getTimeStamp(new Date()),
      };

      if (file === undefined || file === null) {
        uploadPqr(pqr, currentUser.condominiumId, dispatch).then(() => {
          setIsUploading(false);
        });
      } else {
        uploadPqrWithImage(
          pqr,
          file!,
          currentUser.condominiumId,
          dispatch
        ).then(() => {
          setIsUploading(false);
        });
      }
    }
  };

  return (
    <article className="PQRForm">
      {isUploading ? (
        <Toast
          text="Subiendo la información del pqr, por favor espera"
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

      <Chip text="Crear PQRS" />
      <div className="scroll scroll--h PQRForm__scroll">
        <div className="scroll__column PQRForm__column">
          <TextField
            label="Título"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            label="Descripción"
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
