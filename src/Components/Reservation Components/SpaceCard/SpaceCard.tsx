import * as React from "react";
import { useNavigate } from "react-router";

import "./SpaceCard.css";

interface SpaceCardProps {
  name: string;
  img: string;
  id: string;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ name, img, id }) => {
  let navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`Reservas/form/${id}`);
  };

  return (
    <section className="spaceCard" onClick={handleCardClick}>
      <img
        className="spaceCard__img"
        src={`${process.env.PUBLIC_URL}${img}`}
        alt=""
      />
      <div className="spaceCard__content">
        <p>{name}</p>
      </div>
    </section>
  );
};

export default SpaceCard;
