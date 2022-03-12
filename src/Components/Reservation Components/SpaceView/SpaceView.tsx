import * as React from "react";
import { useParams } from "react-router";
import { getSpaceData } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import Btn from "../../Buttons/Btn";
import ScheduleOption from "../ScheduleOption/ScheduleOption";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

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
    schedule: { end: 0, start: 0 },
  });

  const [date, setDate] = React.useState<Date | null>(null);
  const [schedule, setSchedule] = React.useState<
    { start: number; end: number } | undefined
  >(undefined);
  const [submit, setSubmit] = React.useState(false);

  const [options, setOptions] = React.useState<
    { start: number; end: number; selected: boolean }[]
  >([]);

  const getSpace = async () => {
    const snapshot = await getSpaceData(id!);
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
    addOptions(newSpace.schedule.start, newSpace.schedule.end);
  };

  const handleSubmit = () => {
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

    setSchedule({
      start: optionsCopy[index].start,
      end: optionsCopy[index].end,
    });

    setOptions(optionsCopy);
  };

  const addOptions = (hourStart: number, hourEnd: number) => {
    const hourStartParse = new Date(hourStart * 1000).getHours();
    const hourEndtParse = new Date(hourEnd * 1000).getHours();

    const diference = hourEndtParse - hourStartParse;
    const newOptions = [];

    for (let i = 0; i < diference; i++) {
      let option = {
        start: hourStartParse + i,
        end: hourStartParse + (i + 1),
        selected: false,
      };
      newOptions.push(option);
    }

    console.log(newOptions);

    setOptions(newOptions);
  };

  const parseHours = () => {
    const hourStart = new Date(space.schedule.start * 1000).getHours();
    const hourEnd = new Date(space.schedule.end * 1000).getHours();
    return `Horario: ${hourStart}:00 - ${hourEnd}:00`;
  };

  React.useEffect(() => {
    getSpace();
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
      <section className="spaceView__form scroll scroll--h">
        <div className="scroll__column spaceView__scroll">
          <h1>Ocupacion: {space.occupation}</h1>
          <p>{parseHours()}</p>
          <p>
            {space.days.start} a {space.days.end}
          </p>
          <h1>Fecha de reserva</h1>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            style={{
              width: "100%",
            }}
          >
            <MobileDatePicker
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="dd/mm/aaaa"
                  style={{
                    width: "100%",
                    borderRadius: "16px",
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
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
            variant={date !== null && schedule !== undefined ? "" : "disabled"}
            action={() => {
              console.log(
                {
                  date: date,
                  schedule: schedule,
                },
                submit
              );
            }}
            margin="36px"
          />
        </div>
      </section>
    </article>
  );
};

export default SpaceView;
