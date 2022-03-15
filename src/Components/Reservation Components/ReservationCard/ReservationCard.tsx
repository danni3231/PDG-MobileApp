import * as React from "react";
import { getSpaceData } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";

import "./ReservationCard.css";

interface ReservationCardProps {
  spaceId: string;
  dateStart: number;
  dateEnd: number;
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  spaceId,
  dateStart,
  dateEnd,
}) => {
  let dateStartParse = new Date(dateStart * 1000);
  let hourStartString: string = `${dateStartParse.getHours()}:0${dateStartParse.getMinutes()}`;

  let dateEndParse = new Date(dateEnd * 1000);
  let hourEndString: string = `${dateEndParse.getHours()}:0${dateEndParse.getMinutes()}`;

  let dateString: string = `${dateStartParse.getDate()}/${dateStartParse.getMonth()}/${dateStartParse.getFullYear()}`;

  const [space, setSpace] = React.useState<space>({
    img: "",
    name: "",
    id: "",
    occupation: 0,
    days: { end: "", start: "" },
    schedule: { end: 0, start: 0 },
  });

  const getSpace = async () => {
    const snapshot = await getSpaceData(spaceId);
    let data = snapshot.data();
    let newSpace: space = {
      name: data!.name,
      img: data!.img,
      id: data!.id,
      occupation: data!.occupation,
      days: {
        end: data!.days.end,
        start: data!.days.start,
      },
      schedule: {
        end: data!.schedule.end,
        start: data!.schedule.start,
      },
    };

    setSpace(newSpace);
  };

  React.useEffect(() => {
    getSpace();
  }, []);

  return (
    <section className="reservationCard">
      <div className="reservationCard__header">
        <h2>Zona Reservada</h2>
        <img src={`${process.env.PUBLIC_URL}/Icons/edit.svg`} alt="" />
      </div>
      <div className="reservationCard__body">
        <p className="reservationCard__body__title">{space.name}</p>
        <p>{`Hora: ${hourStartString} a ${hourEndString}`}</p>
        <p>{`Fecha: ${dateString}`}</p>
      </div>
    </section>
  );
};

export default ReservationCard;
