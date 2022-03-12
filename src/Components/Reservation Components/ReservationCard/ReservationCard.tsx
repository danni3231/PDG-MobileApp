import * as React from "react";
import { space } from "../../../Types/space";

import "./ReservationCard.css";

interface ReservationCardProps {
  spaceid: string;
  dateStart: number;
  dateEnd: number;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  spaceid,
  dateStart,
  dateEnd,
}) => {
  let dateStartParse = new Date(dateStart * 1000);
  let hourStartString: string = `${dateStartParse.getHours()}:${dateStartParse.getMinutes()}`;

  let dateEndParse = new Date(dateEnd * 1000);
  let hourEndString: string = `${dateEndParse.getHours()}:${dateEndParse.getMinutes()}`;

  let dateString: string = `${dateStartParse.getDay()}/${dateStartParse.getMonth()}/${dateStartParse.getFullYear()}`;

  const [space, setSpace] = React.useState<space>({
    img: "",
    name: "",
    id: "",
    occupation: 0,
    days: { end: "", start: "" },
    schedule: { end: "", start: "" },
  });

  return (
    <section className="reservationCard">
      <div className="reservationCard__header">
        <h2>Zona Reservada</h2>
        <img src={`${process.env.PUBLIC_URL}/Icons/edit.svg`} alt="" />
      </div>
      <div className="reservationCard__body">
        <p className="reservationCard__body__title">{spaceid}</p>
        <p>{`Hora: ${hourStartString} a ${hourEndString}`}</p>
        <p>{`Fecha: ${dateString}`}</p>
      </div>
    </section>
  );
};

export default ReservationCard;
