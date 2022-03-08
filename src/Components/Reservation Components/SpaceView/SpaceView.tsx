import * as React from "react";
import { useParams } from "react-router";
import { getSpaceData } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import Btn from "../../Buttons/Btn";
import ScheduleOption from "../ScheduleOption/ScheduleOption";

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

  const [options, setOptions] = React.useState<
    { start: number; end: number; selected: boolean }[]
  >([]);

  const getSpace = async () => {
    const snapshot = await getSpaceData(id!);

    let t1 = new Date(),
      t2 = new Date();

    t1.setHours(~~snapshot.data()!.schedule.end, 0, 0);
    t2.setHours(~~snapshot.data()!.schedule.start, 0, 0);

    const t1Parse = t1.toLocaleTimeString("co", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const t2Parse = t2.toLocaleTimeString("co", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const diference = ~~t1.getHours() - ~~t2.getHours();
    const newOptions = [];

    for (let i = 0; i < diference; i++) {
      let option = {
        start: t2.getHours() + i,
        end: t2.getHours() + (i + 1),
        selected: false,
      };
      newOptions.push(option);
    }

    setOptions(newOptions);

    const space: space = {
      name: snapshot.data()!.name,
      img: snapshot.data()!.img,
      occupation: snapshot.data()!.occupation,
      days: snapshot.data()!.days,
      schedule: {
        end: t1Parse,
        start: t2Parse,
      },
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

  const handleOptionClick = (index: number) => {
    const optionsCopy = options.slice();

    optionsCopy.forEach((option) => {
      option.selected = false;
    });

    optionsCopy[index].selected = true;

    setOptions(optionsCopy);
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
          src={`${process.env.PUBLIC_URL}${space.img}`}
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
            horario: {space.schedule.start} - {space.schedule.end}
          </p>
          <p>
            {space.days.start} a {space.days.end}
          </p>
          <h1>Fecha de reserva</h1>
          <input type="date" name="" id="" />
          <h1>Horarios</h1>

          <section className="spaceView__schedule">
            {options.map((option, i) => {
              if (option.selected) {
                return (
                  <ScheduleOption
                    key={i}
                    update={handleOptionClick}
                    start={option.start}
                    end={option.end}
                    index={i}
                    selected
                  />
                );
              } else {
                return (
                  <ScheduleOption
                    key={i}
                    update={handleOptionClick}
                    start={option.start}
                    end={option.end}
                    index={i}
                  />
                );
              }
            })}
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
