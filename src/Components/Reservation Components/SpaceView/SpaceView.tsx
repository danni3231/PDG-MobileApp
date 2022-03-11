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
import styled from "@emotion/styled";

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

  React.useEffect(() => {
    getSpace();
  }, []);

  const CustomTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: "#7b61ff",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#7b61ff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: "50px",
      },
      "&:hover fieldset": {
        borderColor: "#7b61ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#7b61ff",
      },
    },
    "& .MuiButtonBase-root": {
      marginRight: "0px",
    },
  });

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
          <p>
            horario: {space.schedule.start} - {space.schedule.end}
          </p>
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
                <CustomTextField
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
