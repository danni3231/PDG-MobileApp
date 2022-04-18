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
  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const users = useSelector<AppState, AppState["users"]>(
    (state) => state.users
  );

  const chats = useSelector<AppState, AppState["chats"]>(
    (state) => state.chats
  );

  const chatsPreviews: chatPreview[] = [];

  chats.forEach((chat) => {
    const userID = chat.users.find((userId) => userId !== currentUser.id);
    const user = users.find((user) => user.id === userID);

    const lastMessageId = chat.messages.length - 1;

    let messageCount = 0;

    const chatParse = {
      chatId: chat.id,
      userId: user!.id,
      lastMessage: chat.messages[lastMessageId].text,
      lastMessageDate: chat.messages[lastMessageId].sendAt,
      unReadMessages: messageCount,
      lastMessageYou: chat.messages[lastMessageId].sendBy === currentUser.id,
    };

    chatsPreviews.push(chatParse);
  });

  return (
    <section className="chatList">
      <div className="scroll scroll--h chatList__scroll">
        <div className="scroll__column chatList__column">
          {chatsPreviews.map((chatPreview: chatPreview) => {
            return (
              <ChatPreview key={chatPreview.chatId} chatInfo={chatPreview} />
            );
          })}
        </div>

        <div className="chatList__btn">
          <img src={`${process.env.PUBLIC_URL}/Icons/plus.svg`} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ChatList;
