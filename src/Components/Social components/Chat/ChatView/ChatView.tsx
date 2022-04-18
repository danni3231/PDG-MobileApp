import { InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { uploadMessage } from "../../../../Firebase/firebaseApi";
import { AppState } from "../../../../Redux/Reducers";
import { chat } from "../../../../Types/chat";
import { User } from "../../../../Types/user";
import {
  getTimeStamp,
  goBack,
  parseHour,
} from "../../../../Utils/GeneralFunctions";
import Btn from "../../../UI/Buttons/Btn";

import "./ChatView.css";

interface ChatViewProps {}

const ChatView: React.FC<ChatViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollContentRef = React.useRef<HTMLDivElement>(null);

  const [newMessage, setNewMessage] = React.useState("");

  const chat = useSelector<AppState, chat | undefined>((state) =>
    state.chats.find((chat) => chat.users.includes(id!))
  );

  const userChat = useSelector<AppState, User | undefined>((state) =>
    state.users.find((user) => user.id === id!)
  );

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const handleSend = () => {
    const message = {
      text: newMessage,
      sendBy: currentUser.id,
      sendAt: getTimeStamp(new Date()),
    };

    if (chat === undefined) {
    } else {
      uploadMessage(chat.id, message).then(() => {
        setNewMessage("");
        console.log("Sent message");
      });
    }
  };

  React.useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, scrollContentRef.current?.scrollHeight!);
  });

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

      <div
        className="scroll scroll--h chatView__chat__container"
        ref={scrollRef}
      >
        <div
          className="scroll__column chatView__chat__container__column"
          ref={scrollContentRef}
        >
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
      </div>

      <div className="chatView__chat__inputs">
        <TextField
          focused
          value={newMessage}
          placeholder="Escribe un mensaje"
          onChange={(event) => {
            setNewMessage(event.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" onClick={handleSend}>
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
