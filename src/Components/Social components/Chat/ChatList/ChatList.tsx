import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../Redux/Reducers";
import { chatPreview } from "../../../../Types/chatPreview";
import { User } from "../../../../Types/user";
import ChatPreview from "../ChatPreview/ChatPreview";
import UserPreview from "../UserPreview/UserPreview";

import "./ChatList.css";

interface ChatListProps {}

const ChatList: React.FC<ChatListProps> = ({}) => {
  const chatsPreviews: chatPreview[] = [
    {
      userImg:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      apartment: "208D",
      firstname: "Carlos",
      lastMessage: "esto es un mensaje",
      lastMessageDate: 1649866505,
      unReadMessages: 2,
      lastMessageYou: true,
    },

    {
      userImg:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      apartment: "308D",
      firstname: "Marta",
      lastMessage: "esto es un mensaje x2",
      lastMessageDate: 1649866505,
      unReadMessages: 2,
      lastMessageYou: false,
    },

    {
      userImg:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
      apartment: "408D",
      firstname: "test",
      lastMessage:
        "esto es un mensaje demasiado largo para comprobar  el ellipsis del mensaje por que el css es una mierda",
      lastMessageDate: 1649866505,
      unReadMessages: 2,
      lastMessageYou: true,
    },
  ];

  const users = useSelector<AppState, AppState["users"]>(
    (state) => state.users
  );

  const [activeView, setActiveView] = React.useState<"chats" | "users">(
    "chats"
  );

  const handleChangedView = (view: "chats" | "users") => setActiveView(view);

  return (
    <section className="chatList">
      <div className="scroll scroll--h chatList__scroll">
        {activeView === "chats" ? (
          <div className="scroll__column chatList__column">
            {chatsPreviews.map((chatPreview: chatPreview) => {
              return (
                <ChatPreview
                  key={chatPreview.apartment}
                  chatInfo={chatPreview}
                />
              );
            })}
          </div>
        ) : (
          <div className="scroll__column chatList__column">
            {users.map((user: User) => {
              return <UserPreview key={user.id} userInfo={user} />;
            })}
          </div>
        )}

        {activeView === "chats" ? (
          <div
            className="chatList__btn"
            onClick={() => handleChangedView("users")}
          >
            <img src={`${process.env.PUBLIC_URL}/Icons/plus.svg`} alt="" />
          </div>
        ) : (
          <div
            className="chatList__btn"
            onClick={() => handleChangedView("chats")}
          >
            <img src={`${process.env.PUBLIC_URL}/Icons/backArrow.svg`} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ChatList;
