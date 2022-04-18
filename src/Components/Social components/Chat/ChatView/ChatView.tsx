import { InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppState } from "../../../../Redux/Reducers";
import { chat } from "../../../../Types/chat";
import { User } from "../../../../Types/user";
import { goBack, parseHour } from "../../../../Utils/GeneralFunctions";
import Btn from "../../../UI/Buttons/Btn";

import "./ChatView.css";

interface ChatViewProps {}

const ChatView: React.FC<ChatViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const chat = useSelector<AppState, chat | undefined>((state) =>
    state.chats.find((chat) => chat.id)
  );

  const userChat = useSelector<AppState, User | undefined>((state) =>
    state.users.find((user) => user.id === id!)
  );

  return (
    <article className="chatView">
      <img
        className="chatView__backBtn"
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        onClick={() => {
          goBack(navigate);
        }}
        alt=""
      />
      <div className="chatView__userInfo">
        <img
          className="chatView__userInfo__photo"
          src={userChat?.profileImg}
          alt=""
        />
        <h1>{userChat?.firstname + " " + userChat?.lastname}</h1>
      </div>

      <section className="scroll scroll--h chatView__chat__container">
        <div className="scroll__column chatView__chat__container__column">
          {chat?.messages.map((message, i) => {
            const dateString = parseHour(message.sendAt);

            if (message.sendBy === userChat?.id) {
              return (
                <div
                  key={i}
                  className="chatView__chat__message chatView__chat__message--otherMsg"
                >
                  <p> {message.text}</p>
                  <span className="chatView__chat__message__date">
                    {dateString}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={i}
                className="chatView__chat__message chatView__chat__message--meMsg"
              >
                <p>{message.text}</p>
                <span className="chatView__chat__message__date chatView__chat__message__date--white">
                  {dateString}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <div className="chatView__chat__inputs">
        <TextField
          focused
          placeholder="Escribe un mensaje"
          onChange={(event) => {
            //setSurname(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img src={`${process.env.PUBLIC_URL}/Icons/send.svg`} alt="" />
              </InputAdornment>
            ),
          }}
        />

        <Btn text="+" variant="circle" action={() => {}} />
      </div>
    </article>
  );
};

export default ChatView;
