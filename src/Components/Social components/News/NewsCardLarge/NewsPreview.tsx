import * as React from "react";
import { useNavigate } from "react-router";

import "./NewsPreview.css";

interface NewsPreviewProps {
  title: string;
  img: string;
  date: number;
  id: string;
}

const NewsPreview: React.FC<NewsPreviewProps> = ({ title, img, date, id }) => {
  const navigate = useNavigate();

  const dateParse = new Date(date * 1000);
  const dateString = `${dateParse.getDate()}/${
    dateParse.getMonth() + 1
  } /${dateParse.getFullYear()}`;

  const handleCardClick = () => {
    navigate(`/Reservas/form/${id}`);
  };

  return (
    <section className="newsPreview" onClick={handleCardClick}>
      <img className="newsPreview__img" src={img} alt="" />

      <p className="newsPreview__title">{title}</p>

      <p className="newsPreview__date">{dateString}</p>
    </section>
  );
};

export default NewsPreview;
