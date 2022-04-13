import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

import * as React from "react";
import { useNavigate } from "react-router";
import NewsList from "../News/NewsList/NewsList";
import SocialNav from "./SocialNav/SocialNav";

import "./SocialScreen.css";

interface SocialScreenProps {}

const SocialScreen: React.FC<SocialScreenProps> = ({}) => {
  const navigate = useNavigate();

  const [searchHint, setSearchHint] = React.useState("Buscar un chat");
  const [activeView, setActiveView] = React.useState<"chat" | "news" | "pqr">(
    "chat"
  );

  const goBack = () => () => {
    navigate(-1);
  };

  return (
    <article className="socialScreen">
      <img
        className="spaceList__backBtn"
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        onClick={goBack()}
        alt="backBtn.png"
      />
      <h1>Social</h1>

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
        handleClick={(btnClicked: "chat" | "news" | "pqr") => {
          setActiveView(btnClicked);
          console.log(activeView);
        }}
      />

      {activeView === "chat" ? <NewsList /> : ""}
      {activeView === "news" ? <p>notices</p> : ""}
      {activeView === "pqr" ? <p>pqr</p> : ""}
    </article>
  );
};

export default SocialScreen;
