import { InputAdornment, TextField } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Breathing, Image } from "react-shimmer";
import { createChat, uploadMessage } from "../../../../Firebase/firebaseApi";
import { AppState } from "../../../../Redux/Reducers";
import { chat } from "../../../../Types/chat";
import { User } from "../../../../Types/user";
import { getTimeStamp, parseHour } from "../../../../Utils/GeneralFunctions";
import Chip from "../../../UI/Chip/Chip";

import "./ChatView.css";

interface ChatViewProps {}

const ChatView: React.FC<ChatViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const scrollContentRef = React.useRef<HTMLDivElement>(null);

  const [newMessage, setNewMessage] = React.useState("");

  let chat = useSelector<AppState, chat | undefined>((state) =>
    state.chats.find((chat) => chat.users.includes(id!))
  );

  const chats = useSelector<AppState, AppState["chats"]>(
    (state) => state.chats
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
      const newChat = {
        users: [currentUser.id, userChat?.id],
      };
      setNewMessage(" ");
      createChat(newChat, message).then(() => {
        setNewMessage("");
        chat = chats.find((chat) => chat.users.includes(id!));
      });
    } else {
      setNewMessage(" ");
      uploadMessage(chat.id, message).then(() => {
        setNewMessage("");
      });
    }
  };

  React.useLayoutEffect(() => {
    scrollRef.current?.scrollTo(0, scrollContentRef.current?.scrollHeight!);
  });

  return (
    <article className="chatView">
      <Chip text="Chats" />
      <div className="chatView__userInfo">
        <Image
          src={userChat!.profileImg}
          fallback={<Breathing className="chatView__userInfo__photo" />}
          NativeImgProps={{
            className: "chatView__userInfo__photo",
          }}
          fadeIn
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
              <InputAdornment
                position="end"
                onClick={() => {
                  if (newMessage !== "") {
                    handleSend();
                  }
                }}
              >
                <img src={`${process.env.PUBLIC_URL}/Icons/send.svg`} alt="" />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </article>
  );
};

export default ChatView;
