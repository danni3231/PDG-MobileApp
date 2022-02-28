import * as React from "react";
import { useNavigate } from "react-router";

import "./SpaceCard.css";

interface SpaceCardProps {
  name: string;
  img: string;
  id: string;
  big?: boolean;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ name, img, id, big }) => {
  let navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`Reservas/form/${id}`);
  };

  return (
    <section
      className={big ? "spaceCard spaceCard--big" : "spaceCard"}
      onClick={handleCardClick}
    >
      <img
        className="spaceCard__img"
        src={`${process.env.PUBLIC_URL}${img}`}
        alt=""
      />

      {big ? (
        <div className="spaceCard__content spaceCard__content--big">
          <p>{name}</p>
          <p className="spaceCard__content__smallText">ocupacion//</p>
        </div>
      ) : (
        <div className="spaceCard__content">
          <p>{name}</p>
        </div>
      )}
    </section>
  );
};

export default SpaceCard;
