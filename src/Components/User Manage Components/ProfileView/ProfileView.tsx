import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfilePhoto } from "../../../Firebase/firebaseApi";
import { AppState } from "../../../Redux/Reducers";
import Btn from "../../UI/Buttons/Btn";
import Chip from "../../UI/Chip/Chip";
import Toast from "../../UI/Toast/Toast";

import "./ProfileView.css";

interface ProfileViewProps {}

const ProfileView: React.FC<ProfileViewProps> = ({}) => {
  const dispatch = useDispatch();

  const inputFile = React.useRef<HTMLInputElement>(null);
  const imgPreview = React.useRef<HTMLImageElement>(null);

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const [file, setFile] = React.useState<File | null | undefined>();

  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const handleFile = () => {
    const file = inputFile.current?.files;
    setFile(file?.item(0)!);

    console.log(file);

    if (file) {
      setFile(file?.item(0)!);
      imgPreview.current!.src = URL.createObjectURL(file.item(0)!);
    }
  };

  const openGallery = () => {
    inputFile.current!.click();
  };

  const validateData = () => {
    if (file === null || file === undefined) {
      setErrorMsg("No has cambiado la imagen de perfil");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  const handleUpload = () => {
    if (validateData()) {
      setIsUploading(true);

      updateProfilePhoto(currentUser, file!!, dispatch).then(() => {
        setIsUploading(false);
      });
    }
  };

  return (
    <article>
      {isUploading ? (
        <Toast
          text="Actualizando tu foto de perfil, por favor espera"
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

      <Chip text={"Perfil"} />

      <img
        className="profileView__img"
        ref={imgPreview}
        src={currentUser.profileImg}
        alt=""
      />

      <input
        onChange={handleFile}
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
      />
      <Btn text="Cambiar foto" variant="add" action={openGallery} />

      <Btn
        text={"Actualizar perfil"}
        variant=""
        margin="16px"
        action={handleUpload}
      />
    </article>
  );
};

export default ProfileView;
