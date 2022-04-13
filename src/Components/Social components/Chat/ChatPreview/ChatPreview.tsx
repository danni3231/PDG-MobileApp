import * as React from "react";
import { chatPreview } from "../../../../Types/chatPreview";

import "./ChatPreview.css";

interface ChatPreviewProps {
  chatInfo: chatPreview;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ chatInfo }) => {
  const dateParser = new Date(chatInfo.lastMessageDate * 1000);
  const dateString = `${dateParser.getHours()}:${dateParser.getMinutes()}`;

  return (
    <section className="chatPreview">
      <img className="chatPreview__img" src={chatInfo.userImg} alt="" />
      <div className="chatPreview__content">
        <p className="chatPreview__name">{`${chatInfo.firstname} - ${chatInfo.apartment}`}</p>
        <p className="chatPreview__msg">{chatInfo.lastMessage}</p>
      </div>
      <div className="chatPreview__info">
        <p className="chatPreview__date">{dateString}</p>
        {chatInfo.lastMessageYou ? (
          <img src={`${process.env.PUBLIC_URL}/Icons/check.svg`} alt="" />
        ) : (
          <p className="chatPreview__msgNumber">{chatInfo.unReadMessages}</p>
        )}
      </div>
    </section>
  );
};

export default ChatPreview;
