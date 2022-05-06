import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Breathing, Image } from "react-shimmer";
import { AppState } from "../../../../Redux/Reducers";
import { chatPreview } from "../../../../Types/chatPreview";
import { User } from "../../../../Types/user";
import { parseHour } from "../../../../Utils/GeneralFunctions";

import "./ChatPreview.css";

interface ChatPreviewProps {
  chatInfo: chatPreview;
}

const ChatPreview: React.FC<ChatPreviewProps> = ({ chatInfo }) => {
  const navigate = useNavigate();

  const userChat = useSelector<AppState, User | undefined>((state) =>
    state.users.find((user) => user.id === chatInfo.userId)
  );

  const dateString = parseHour(chatInfo.lastMessageDate);

  return (
    <section
      className="chatPreview"
      onClick={() => navigate(`/Social/Chat/${userChat!.id}`)}
    >
      <Image
        src={userChat!.profileImg}
        fallback={<Breathing className="chatPreview__img" />}
        NativeImgProps={{
          className: "chatPreview__img",
        }}
        fadeIn
      />

      <div className="chatPreview__content">
        <p className="chatPreview__name">{`${userChat!.firstname} ${
          userChat!.lastname
        } - ${userChat!.apartment}`}</p>
        {chatInfo.lastMessageYou ? (
          <div className="chatPreview__msg__container">
            <p className="chatPreview__msg purple">Tu:</p>
            <p className="chatPreview__msg">{chatInfo.lastMessage}</p>
          </div>
        ) : (
          <p className="chatPreview__msg">{chatInfo.lastMessage}</p>
        )}
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
