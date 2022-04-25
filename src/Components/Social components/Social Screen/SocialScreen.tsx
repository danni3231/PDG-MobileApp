import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import * as React from "react";
import { useNavigate } from "react-router";
import Chip from "../../UI/Chip/Chip";
import ChatList from "../Chat/ChatList/ChatList";
import NewsList from "../News/NewsList/NewsList";
import PQRList from "../PQR/PQRList/PQRList";
import SocialNav from "./SocialNav/SocialNav";

import "./SocialScreen.css";

interface SocialScreenProps {}

const SocialScreen: React.FC<SocialScreenProps> = ({}) => {
  const navigate = useNavigate();

  const [searchHint, setSearchHint] = React.useState("Buscar un chat");
  const [activeView, setActiveView] = React.useState<"chat" | "news" | "pqr">(
    "chat"
  );

  return (
    <article className="socialScreen">
      <Chip text="Social" padding />

      <TextField
        placeholder={searchHint}
        onChange={(event) => {
          //setName(event.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <SocialNav
        activeView={activeView}
        handleClick={(btnClicked: "chat" | "news" | "pqr") =>
          setActiveView(btnClicked)
        }
      />

      {activeView === "chat" ? <ChatList /> : ""}
      {activeView === "news" ? <NewsList /> : ""}
      {activeView === "pqr" ? <PQRList /> : ""}
    </article>
  );
};

export default SocialScreen;
