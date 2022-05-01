import * as React from "react";

import "./PQRCard.css";

interface PQRCardProps {
  title: string;
  content?: string;
  img?: string;
  date: number;
  id: string;
}

const PQRCard: React.FC<PQRCardProps> = ({ title, content, img, date, id }) => {
  const dateParse = new Date(date * 1000);
  const dateString = `${dateParse.getDate()}/${
    dateParse.getMonth() + 1
  }/${dateParse.getFullYear()}`;

  if (img !== undefined) {
    return (
      <section className="pqrCard">
        <img className="pqrCard__img" src={img} alt="" />

        <p className="pqrCard__title">{title}</p>

        <div className="pqrCard__row">
          <p className="pqrCard__date">{dateString}</p>
          <div className="pqrCard__icons">
            <img src={`${process.env.PUBLIC_URL}/Icons/share.svg`} alt="" />
            <img src={`${process.env.PUBLIC_URL}/Icons/bookmark.svg`} alt="" />
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="pqrCard">
        <p className="pqrCard__title">{title}</p>

        <p className="pqrCard__content">{content}</p>

        <div className="pqrCard__row">
          <p className="pqrCard__date">{dateString}</p>
          <div className="pqrCard__icons">
            <img src={`${process.env.PUBLIC_URL}/Icons/share.svg`} alt="" />
            <img src={`${process.env.PUBLIC_URL}/Icons/bookmark.svg`} alt="" />
          </div>
        </div>
      </section>
    );
  }
};

export default PQRCard;
