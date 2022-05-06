import { MenuItem, Select, TextField } from "@mui/material";
import * as React from "react";
import { createUser } from "../../../Firebase/firebaseApi";
import { User } from "../../../Types/user";
import { castCondominiumId } from "../../../Utils/GeneralFunctions";
import Btn from "../../UI/Buttons/Btn";

import "./CreateUser.css";

interface CreateUserProps {}

const CreateUser: React.FC<CreateUserProps> = () => {
  const [condominium, setCondominium] = React.useState("");
  const [apartment, setApartment] = React.useState("");

  const [id, setId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");

  const profileImg =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  const handleSubmit = () => {
    const condominiumId = castCondominiumId(condominium);

    const newUser: User = {
      firstname: firstname,
      lastname: lastname,
      condominiumId: condominiumId,
      apartment: apartment,
      profileImg: profileImg,
      id: id,
    };

    createUser(newUser).then(() => {
      setFirstname("");
      setLastname("");
      setCondominium("");
      setApartment("");
      setId("");
    });
  };

  return (
    <article>
      <h1>Crear Usuario</h1>

      <p>Info del conjunto</p>

      <Select
        value={condominium}
        displayEmpty
        renderValue={(v) => (v !== "" ? v : "Selecciona un conjunto")}
        defaultValue="none"
        onChange={(e) => setCondominium(e.target.value)}
      >
        <MenuItem value={"Guadalupe Alto"}>Guadalupe Alto</MenuItem>
        <MenuItem value={"El Coral"}>El Coral</MenuItem>
        <MenuItem value={"Boho U Living"}>Boho U Living</MenuItem>
      </Select>

      <TextField
        value={apartment}
        label="Apartamento"
        onChange={(event) => setApartment(event.target.value)}
      />

      <p>Info del usuario</p>

      <TextField
        value={id}
        label="Numero de identificación"
        onChange={(event) => setId(event.target.value)}
      />

      <TextField
        value={firstname}
        label="Nombre"
        onChange={(event) => setFirstname(event.target.value)}
      />

      <TextField
        value={lastname}
        label="Apellido"
        onChange={(event) => setLastname(event.target.value)}
      />

      <Btn
        text={"Crear el usuario"}
        variant={""}
        margin="18px"
        action={() => handleSubmit()}
      />
    </article>
  );
};

export default CreateUser;
