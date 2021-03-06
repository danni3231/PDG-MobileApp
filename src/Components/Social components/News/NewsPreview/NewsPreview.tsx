import * as React from "react";
import { Breathing, Image } from "react-shimmer";
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
  }/${dateParse.getFullYear()}`;

  const handleCardClick = () => {
    navigate(`/Social/Noticias/${id}`);
  };

  return (
    <section className="newsPreview" onClick={handleCardClick}>
      <Image
        src={img}
        fallback={<Breathing className="newsPreview__img" />}
        NativeImgProps={{
          className: "newsPreview__img",
        }}
        fadeIn
      />

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

export default NewsPreview;
