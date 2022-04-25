import { TextField } from "@mui/material";
import * as React from "react";
import Btn from "../../../UI/Buttons/Btn";
import Chip from "../../../UI/Chip/Chip";

import "./PQRForm.css";

interface PQRFormProps {}

const PQRForm: React.FC<PQRFormProps> = ({}) => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const [file, setFile] = React.useState<FileList | null | undefined>();

  const openGallery = () => {
    inputFile.current!.click();
  };

  const handleFile = () => {
    const file = inputFile.current?.files;
    setFile(file);

    console.log(file);

    if (file) {
      console.log("yep");
      imgPreview.current!.src = URL.createObjectURL(file.item(0)!);
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
              //setName(event.target.value);
            }}
          />
          <TextField
            placeholder="Añade una descripción del asunto"
            multiline
            rows={10}
            onChange={(event) => {
              //setName(event.target.value);
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

          <Btn text={"Publicar"} variant="" margin="16px" action={() => {}} />
        </div>
      </div>
    </article>
  );
};

export default PQRForm;
