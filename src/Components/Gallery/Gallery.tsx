import * as React from "react";
import { useNavigate } from "react-router";
import { space } from "../../Types/space";
import SpaceCard from "../Reservation Components/SpaceCard/SpaceCard";

import "./Gallery.css";

interface GalleryProps {
  title: string;
  list: space[];
  url: string;
}

const Gallery: React.FC<GalleryProps> = ({ title, list, url }) => {
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
          {list.map((space) => {
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
