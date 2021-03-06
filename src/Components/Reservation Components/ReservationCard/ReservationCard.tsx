import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../Redux/Reducers";
import { space } from "../../../Types/space";

import "./ReservationCard.css";

interface ReservationCardProps {
  id: string;
  spaceId: string;
  dateStart: number;
  dateEnd: number;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  id,
  spaceId,
  dateStart,
  dateEnd,
}) => {
  const navigate = useNavigate();

  let dateStartParse = new Date(dateStart * 1000);
  let hourStartString: string = `${dateStartParse.getHours()}:0${dateStartParse.getMinutes()}`;

  let dateEndParse = new Date(dateEnd * 1000);
  let hourEndString: string = `${dateEndParse.getHours()}:0${dateEndParse.getMinutes()}`;

  let dateString: string = `${dateStartParse.getDate()}/${
    dateStartParse.getMonth() + 1
  }/${dateStartParse.getFullYear()}`;

  const space: space | undefined = useSelector<AppState, space | undefined>(
    (state) => state.spaces.find((spaces) => spaces.id === spaceId)
  );

  const handleOpenEdit = () => {
    navigate(`/Reservas/form/${spaceId}/${id}`);
  };

  return (
    <section className="reservationCard">
      <div className="reservationCard__header">
        <h2>Zona Reservada</h2>
        <img
          src={`${process.env.PUBLIC_URL}/Icons/Edit.svg`}
          alt=""
          onClick={() => handleOpenEdit()}
        />
      </div>
      <div className="reservationCard__body">
        <p className="reservationCard__body__title">{space!.name}</p>
        <p>{`Hora: ${hourStartString} a ${hourEndString}`}</p>
        <p>{`Fecha: ${dateString}`}</p>
      </div>
    </section>
  );
};

export default ReservationCard;
