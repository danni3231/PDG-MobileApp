import * as React from "react";
import { useNavigate, useParams } from "react-router";
import {
  uploadBooking,
  validateUserState,
} from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import Btn from "../../UI/Buttons/Btn";
import ScheduleOption from "../ScheduleOption/ScheduleOption";

import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { es } from "date-fns/locale";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import "./SpaceView.css";
import { booking } from "../../../Types/booking";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../Redux/Reducers";
import Toast from "../../UI/Toast/Toast";

interface SpaceViewProps {}

const SpaceView: React.FC<SpaceViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const space: space | undefined = useSelector<AppState, space | undefined>(
    (state) => state.spaces.find((spaces) => spaces.id === id!)
  );

  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [date, setDate] = React.useState<Date | null>(null);
  const [schedule, setSchedule] = React.useState<
    { start: number; end: number } | undefined
  >(undefined);
  const [options, setOptions] = React.useState<
    { start: number; end: number; selected: boolean }[]
  >([]);

  const handleSubmit = () => {
    if (validateData()) {
      setIsUploading(true);

      date?.setMinutes(0);

      const dateStart = new Date(date!);
      dateStart?.setHours(schedule?.start!);
      const dateStartParse = parseInt((dateStart!.getTime() / 1000).toFixed(0));

      const dateEnd = new Date(date!);
      dateEnd?.setHours(schedule?.end!);
      const dateEndParse = parseInt((dateEnd!.getTime() / 1000).toFixed(0));

      console.log(dateStart, dateEnd);

      let newBooking: booking = {
        id: "",
        userId: "Alfa",
        spaceId: id!,
        dateEnd: dateEndParse,
        dateStart: dateStartParse,
      };

      uploadBooking(newBooking, dispatch).then(() => {
        navigate("/Reservas");
      });
    }
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

    setOptions(newOptions);
  };

  const parseHours = () => {
    const hourStart = new Date(space!.schedule.start * 1000).getHours();
    const hourEnd = new Date(space!.schedule.end * 1000).getHours();
    return `Horario: ${hourStart}:00 - ${hourEnd}:00`;
  };

  const validateData = () => {
    if (date === null) {
      setErrorMsg("Falta la fecha de reserva");
      setError(true);
      return false;
    } else if (schedule === undefined) {
      setErrorMsg("Falta el horario de reserva");
      setError(true);
      return false;
    } else {
      return true;
    }
  };

  React.useEffect(() => {
    addOptions(space!.schedule.start, space!.schedule.end);
  }, []);

  return (
    <article className="spaceView">
      {isUploading ? (
        <Toast
          text="Subiendo la información de la reserva, por favor espera"
          type="success"
        />
      ) : (
        ""
      )}

      {error ? (
        <Toast
          text={errorMsg}
          type="error"
          btn
          closeAction={() => {
            setError(false);
          }}
        />
      ) : (
        ""
      )}

      <section className="spaceView__header">
        <img
          className="spaceView__header__img"
          src={`${process.env.PUBLIC_URL}${space!.img}`}
          alt=""
        />
        <div className="spaceView__header__content">
          <p>{space!.name}</p>
        </div>
      </section>
      <section className="spaceView__form scroll scroll--h">
        <div className="scroll__column spaceView__scroll">
          <h1>Ocupacion: {space!.occupation}</h1>
          <p>{parseHours()}</p>
          <p>
            {space!.days.start} a {space!.days.end}
          </p>
          <h1>Fecha de reserva</h1>
          <LocalizationProvider
            locale={es}
            dateAdapter={AdapterDateFns}
            style={{
              width: "100%",
            }}
          >
            <MobileDatePicker
              minDate={new Date()}
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="mm/dd/aaaa"
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
              handleSubmit();
            }}
            margin="36px"
          />
        </div>
      </section>
    </article>
  );
};
export default SpaceView;
