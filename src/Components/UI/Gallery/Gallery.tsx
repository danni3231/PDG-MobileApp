import * as React from "react";
import { useNavigate } from "react-router";
import { news } from "../../../Types/news";
import { space } from "../../../Types/space";
import SpaceCard from "../../Reservation Components/SpaceCard/SpaceCard";
import NewsCard from "../../Social components/News/NewsCard/NewsCard";

import "./Gallery.css";

interface GalleryProps {
  title: string;
  listSpace?: space[];
  listNews?: news[];
  url: string;
  isNotice?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  listSpace,
  listNews,
  url,
  isNotice,
}) => {
  let navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(url);
  };

  return (
    <section className="gallery">
      <div className="gallery__title">
        <p>{title}</p>
        <p className="gallery__btn" onClick={handleBtnClick}>
          Ver todo
        </p>
      </div>

      <div className="gallery__stripe scroll">
        <div className="gallery__stripe__row scroll__row">
          {isNotice
            ? listNews!.map((news) => {
                return (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    img={news.img}
                    content={news.content}
                  />
                );
              })
            : listSpace!.map((space) => {
                return (
                  <SpaceCard
                    key={space.id}
                    id={space.id}
                    name={space.name}
                    img={space.img}
                  />
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
