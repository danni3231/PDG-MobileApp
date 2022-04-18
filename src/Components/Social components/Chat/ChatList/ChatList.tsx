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

    let messageCount = 0;

    if (chat.messages[0].sendBy !== currentUser.id) {
      let msgWriter = chat.messages[0].sendBy;

      while (msgWriter === chat.messages[0].sendBy) {
        chat.messages.slice(0, 8).forEach((msg) => {
          if (msg.sendBy !== currentUser.id) {
            messageCount++;
          }

          msgWriter = msg.sendBy;
        });
      }
    }

    const chatParse = {
      chatId: chat.id,
      userId: user!.id,
      lastMessage: chat.messages[0].text,
      lastMessageDate: chat.messages[0].sendAt,
      unReadMessages: messageCount,
      lastMessageYou: chat.messages[0].sendBy === currentUser.id,
    };

    chatsPreviews.push(chatParse);
  });

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
                <ChatPreview key={chatPreview.chatId} chatInfo={chatPreview} />
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
