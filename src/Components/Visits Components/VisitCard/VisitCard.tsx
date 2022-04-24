import * as React from "react";
import { useNavigate } from "react-router";

import "./VisitCard.css";

interface VisitCardProps {
  id: string;
  name: string;
  typeId: string;
  visitorId: number;
  date: number;
}

const VisitCard: React.FC<VisitCardProps> = ({
  id,
  name,
  typeId,
  visitorId,
  date,
}) => {
  const navigate = useNavigate();

  let dateParse = new Date(date * 1000);
  let dateString: string = `${dateParse.getDate()}/${
    dateParse.getMonth() + 1
  }/${dateParse.getFullYear()}`;

  const handleEdit = () => {
    navigate(`/Visitas/form/edit/${id}`);
  };

  return (
    <section className="visitCard">
      <div className="visitCard__header">
        <h2>Visita autorizada</h2>
        <img
          src={`${process.env.PUBLIC_URL}/Icons/Edit.svg`}
          alt=""
          onClick={() => handleEdit()}
        />
      </div>
      <div className="visitCard__body">
        <p className="visitCard__body__title">{name}</p>
        <p>{`${
          typeId === "Tarjeta de Identidad" ? "T.I" : "C.C"
        } : ${visitorId}`}</p>
        <p>{`Fecha: ${dateString}`}</p>
      </div>
    </section>
  );
};

export default VisitCard;
