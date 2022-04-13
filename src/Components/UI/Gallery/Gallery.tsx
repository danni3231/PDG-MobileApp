import * as React from "react";
import { useNavigate } from "react-router";
import { notice } from "../../../Types/notice";
import { space } from "../../../Types/space";
import SpaceCard from "../../Reservation Components/SpaceCard/SpaceCard";
import NoticeCard from "../../Social components/Notices/NoticeCard/NoticeCard";

import "./Gallery.css";

interface GalleryProps {
  title: string;
  listSpace?: space[];
  listNotice?: notice[];
  url: string;
  isNotice?: boolean;
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  listSpace,
  listNotice,
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
            ? listNotice!.map((notice) => {
                return (
                  <NoticeCard
                    key={notice.id}
                    id={notice.id}
                    title={notice.title}
                    img={notice.img}
                    content={notice.content}
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
