import * as React from "react";
import { useParams } from "react-router";
import { getSpaceData } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import Btn from "../../Buttons/Btn";

import "./SpaceView.css";

interface SpaceViewProps {}

const SpaceView: React.FC<SpaceViewProps> = ({}) => {
  let { id } = useParams();

  const [space, setSpace] = React.useState<space>({
    img: "",
    name: "",
    id: "",
    occupation: 0,
    days: { end: "", start: "" },
    schedule: { end: "", start: "" },
  });

  const [date, setDate] = React.useState("");
  const [schedule, setSchedule] = React.useState("");
  const [submit, setSubmit] = React.useState(false);

  const getSpace = async () => {
    const snapshot = await getSpaceData(id!);

    let t1 = new Date(),
      t2 = new Date();

    t1.setHours(~~snapshot.data()!.schedule.end, 0, 0);
    t2.setHours(~~snapshot.data()!.schedule.start, 0, 0);

    t1.setHours(
      t1.getHours() - t2.getHours(),
      t1.getMinutes() - t2.getMinutes(),
      t1.getSeconds() - t2.getSeconds()
    );

    console.log(`diferencia ${t1.getHours()} horas`);

    const space: space = {
      name: snapshot.data()!.name,
      img: snapshot.data()!.name,
      occupation: snapshot.data()!.occupation,
      days: snapshot.data()!.days,
      schedule: snapshot.data()!.schedule,
      id: id!,
    };

    setSpace(space);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: any
  ) => {
    console.log({
      date: date,
      schedule: schedule,
    });
  };

  React.useEffect(() => {
    getSpace();

    if (date != "" && schedule != "") {
      setSubmit(true);
    }
  }, []);

  return (
    <article className="spaceView">
      <section className="spaceView__header">
        <img
          className="spaceView__header__img"
          src={`${process.env.PUBLIC_URL}/Img/pool.png`}
          alt=""
        />
        <div className="spaceView__header__content">
          <p>{space.name}</p>
        </div>
      </section>
      <form
        className="spaceView__form scroll scroll--h"
        onSubmit={handleSubmit}
      >
        <div className="scroll__column spaceView__scroll">
          <h1>Ocupacion: {space.occupation}</h1>
          <p>
            horario: {space.schedule.start} a {space.schedule.end}
          </p>
          <p>
            {space.days.start} a {space.days.end}
          </p>
          <h1>Fecha de reserva</h1>
          <input type="date" name="" id="" />
          <h1>Horarios</h1>

          <section className="spaceView__schedule">
            {}
            <div className="spaceView__schedule__option spaceView__schedule__option--selected">
              13:00 - 65 am
            </div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
            <div className="spaceView__schedule__option"> 13:00 - 65 am</div>
          </section>

          <Btn
            text="Confirmar"
            variant={submit ? "" : "disabled"}
            action={() => {}}
            margin="36px"
          />
        </div>
      </form>
    </article>
  );
};

export default SpaceView;
