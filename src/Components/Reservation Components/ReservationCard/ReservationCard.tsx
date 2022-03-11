import * as React from "react";

import "./ReservationCard.css";

interface ReservationCardProps {
  name: string;
  dateStart: number;
  dateEnd: number;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  name,
  dateStart,
  dateEnd,
}) => {
  let dateStartParse = new Date(dateStart * 1000);
  let dateStartString: string = `${dateStartParse.getHours()}:${dateStartParse.getMinutes()}`;

  let dateEndParse = new Date(dateEnd * 1000);
  let dateEndString: string = `${dateEndParse.getHours()}:${dateEndParse.getMinutes()}`;
  return (
    <section className="reservationCard">
      <div className="reservationCard__header">
        <h2>Zona Reservada</h2>
        <img src={`${process.env.PUBLIC_URL}/Icons/edit.svg`} alt="" />
      </div>
      <div className="reservationCard__body">
        <h2>{name}</h2>
        <p>{`Hora: ${dateStartString} a ${dateEndString}`}</p>
        <p></p>
      </div>
    </section>
  );
};

export default ReservationCard;
