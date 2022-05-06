import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breathing, Image } from "react-shimmer";
import { SuspenseImage } from "react-shimmer/dist/Image";
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
  const imgPreview: React.LegacyRef<SuspenseImage> =
    React.useRef<SuspenseImage>(null);

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
      imgPreview.current!.imgRef.current!.src = URL.createObjectURL(
        file.item(0)!
      );
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

      <Image
        ref={imgPreview}
        src={currentUser.profileImg}
        fallback={<Breathing className="profileView__img" />}
        NativeImgProps={{
          className: "profileView__img",
        }}
        fadeIn
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
