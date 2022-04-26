import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../../Redux/Reducers";
import { chatPreview } from "../../../../Types/chatPreview";

import ChatPreview from "../ChatPreview/ChatPreview";

import "./ChatList.css";

interface ChatListProps {}

const ChatList: React.FC<ChatListProps> = ({}) => {
  const navigate = useNavigate();

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

    let currentChatOwner = chat.messages[lastMessageId].sendBy;

    let lastMessageIndex = lastMessageId;

    if (currentChatOwner !== currentUser.id) {
      while (currentChatOwner === chat.messages[lastMessageId].sendBy) {
        if (lastMessageIndex > 0) {
          lastMessageIndex -= 1;
          currentChatOwner = chat.messages[lastMessageIndex].sendBy;
        } else {
          currentChatOwner = "";
        }
        messageCount += 1;
      }
    }

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
          {chats.length === 0 ? (
            <p className="chatList__column__onboarding">
              Aún no tienes ninguna conversación. Presiona el botón flotante
              para crear una nueva conversación.
            </p>
          ) : (
            chatsPreviews.map((chatPreview: chatPreview) => {
              return (
                <ChatPreview key={chatPreview.chatId} chatInfo={chatPreview} />
              );
            })
          )}
        </div>

        <div
          className="chatList__btn"
          onClick={() => navigate("/Social/AllUsers")}
        >
          <img src={`${process.env.PUBLIC_URL}/Icons/plus.svg`} alt="" />
        </div>
      </div>
    </section>
  );
};

export default ChatList;
