import * as React from "react";

import "./PQRCard.css";

interface PQRCardProps {
  title: string;
  img: string;
  date: number;
  id: string;
}

const PQRCard: React.FC<PQRCardProps> = ({ title, img, date, id }) => {
  const dateParse = new Date(date * 1000);
  const dateString = `${dateParse.getDate()}/${
    dateParse.getMonth() + 1
  }/${dateParse.getFullYear()}`;

  return (
    <section className="pqrCard">
      <img className="newsPreview__img" src={img} alt="" />

      <p className="newsPreview__title">{title}</p>

      <div className="newsPreview__row">
        <p className="newsPreview__date">{dateString}</p>
        <div className="newsPreview__icons">
          <img src={`${process.env.PUBLIC_URL}/Icons/share.svg`} alt="" />
          <img src={`${process.env.PUBLIC_URL}/Icons/bookmark.svg`} alt="" />
        </div>
      </div>
    </section>
  );
};

export default PQRCard;
