import * as React from "react";
import { getSpaceData } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";

import "./VisitCard.css";

interface VisitCardProps {
  name: string;
  userId: string;
  typeId: string;
  visitorId: string;
  date: number;
}

const VisitCard: React.FC<VisitCardProps> = ({
  name,
  userId,
  typeId,
  visitorId,
  date,
}) => {
  let dateParse = new Date(date * 1000);
  let dateString: string = `${dateParse.getDay()}/${dateParse.getMonth()}/${dateParse.getFullYear()}`;
  return (
    <section className="visitCard">
      <div className="visitCard__header">
        <h2>Zona Reservada</h2>
        <img src={`${process.env.PUBLIC_URL}/Icons/edit.svg`} alt="" />
      </div>
      <div className="visitCard__body">
        <p className="visitCard__body__title">{name}</p>
        <p>{`${typeId} ${visitorId}`}</p>
        <p>{`Fecha: ${dateString}`}</p>
      </div>
    </section>
  );
};

export default VisitCard;
