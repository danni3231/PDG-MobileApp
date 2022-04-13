import * as React from "react";
import { chatPreview } from "../../../../Types/chatPreview";
import ChatPreview from "../ChatPreview/ChatPreview";

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
  return (
    <section className="chatList">
      <div className="scroll scroll--h chatList__scroll">
        <div className="scroll__column chatList__column">
          {chatsPreviews.map((chatsPreview: chatPreview) => {
            return (
              <ChatPreview
                key={chatsPreview.apartment}
                chatInfo={chatsPreview}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChatList;
