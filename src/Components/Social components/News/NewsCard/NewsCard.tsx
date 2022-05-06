import * as React from "react";
import { useNavigate } from "react-router";
import { Breathing, Image } from "react-shimmer";

import "./NewsCard.css";

interface NewsCardProps {
  title: string;
  img: string;
  content: string;
  id: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, img, content, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Social/Noticias/${id}`);
  };

  return (
    <section className="newsCard" onClick={handleCardClick}>
      <Image
        src={img}
        fallback={<Breathing className="newsCard__img" />}
        NativeImgProps={{ className: "newsCard__img" }}
        fadeIn
      />

      <div className="newsCard__content">
        <p className="newsCard__content__title">{title}</p>
        <p className="newsCard__content__smallText">{content}</p>
      </div>
    </section>
  );
};

export default NewsCard;
