import * as React from "react";
import { useNavigate } from "react-router";

import "./NoticeCard.css";

interface NoticeCardProps {
  title: string;
  img: string;
  content: string;
  id: string;
}

const NoticeCard: React.FC<NoticeCardProps> = ({ title, img, content, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Reservas/form/${id}`);
  };

  return (
    <section className={"noticeCard"} onClick={handleCardClick}>
      <img className="noticeCard__img" src={img} alt="" />

      <div className="noticeCard__content">
        <p className="noticeCard__content__title">{title}</p>
        <p className="noticeCard__content__smallText">{content}</p>
      </div>
    </section>
  );
};

export default NoticeCard;
