import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { Breathing, Image } from "react-shimmer";
import { uploadBooking } from "../../../Firebase/firebaseApi";
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
import { User } from "../../../Types/user";
import { goBack } from "../../../Utils/GeneralFunctions";

interface SpaceViewProps {}

type schedule = { start: number; end: number } | undefined;
type option = {
  start: number;
  end: number;
  selected: boolean;
  disabled?: boolean;
};

const SpaceView: React.FC<SpaceViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser: User = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const bookings = useSelector<AppState, AppState["bookings"]>(
    (state) => state.bookings
  );

  const space: space | undefined = useSelector<AppState, space | undefined>(
    (state) => state.spaces.find((spaces) => spaces.id === id!)
  );

  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("default msg");

  const [date, setDate] = React.useState<Date | null>(null);
  const [schedule, setSchedule] = React.useState<schedule>(undefined);
  const [options, setOptions] = React.useState<option[]>([]);

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
        userId: currentUser.id,
        spaceId: id!,
        dateEnd: dateEndParse,
        dateStart: dateStartParse,
      };

      uploadBooking(newBooking, currentUser.condominiumId, dispatch).then(
        () => {
          navigate("/Reservas");
        }
      );
    }
  };

  const handleOptionClick = (index: number) => {
    const optionsCopy = options.slice();
    let newSchedule: schedule = undefined;

    if (
      (optionsCopy[index - 1]?.selected && !optionsCopy[index - 3]?.selected) ||
      (optionsCopy[index + 1]?.selected && !optionsCopy[index + 3]?.selected)
    ) {
      newSchedule = {
        start: schedule!.start,
        end: optionsCopy[index].end,
      };
    } else {
      optionsCopy.forEach((option) => {
        option.selected = false;
      });

      newSchedule = {
        start: optionsCopy[index].start,
        end: optionsCopy[index].end,
      };
    }

    optionsCopy[index].selected = true;

    setSchedule(newSchedule);
    setOptions(optionsCopy);
  };

  const addOptions = (hourStart: number, hourEnd: number) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    const hourStartParse = new Date(hourStart * 1000).getHours();
    const hourEndtParse = new Date(hourEnd * 1000).getHours();

    const newOptions = [];

    const exeption: number[] = [];

    bookings.forEach((booking) => {
      const dateStartParse = new Date(booking.dateStart * 1000);

      if (
        dateStartParse.getDate() === date?.getDate() &&
        booking.spaceId == space?.id
      ) {
        const dateEndParse = new Date(booking.dateEnd * 1000);
        const diferenceHour =
          dateEndParse.getHours() - dateStartParse.getHours();

        for (let i = 0; i < diferenceHour; i++) {
          let hour = dateStartParse.getHours() + i;

          exeption.push(hour);
        }
      }
    });

    if (
      currentHour > hourStartParse &&
      date?.getDate() === currentDate.getDate()
    ) {
      const diference = hourEndtParse - currentHour - 1;

      for (let i = 0; i < diference; i++) {
        const start = currentHour + 1 + i;

        let option: option = {
          start: 0,
          end: 0,
          selected: false,
        };

        if (exeption.includes(start)) {
          option = {
            start: currentHour + 1 + i,
            end: currentHour + 1 + (i + 1),
            selected: false,
            disabled: true,
          };
        } else {
          option = {
            start: currentHour + 1 + i,
            end: currentHour + 1 + (i + 1),
            selected: false,
          };
        }

        newOptions.push(option);
      }
    } else {
      const diference = hourEndtParse - hourStartParse;

      for (let i = 0; i < diference; i++) {
        const start = hourStartParse + i;

        let option: option = {
          start: 0,
          end: 0,
          selected: false,
        };

        if (exeption.includes(start)) {
          option = {
            start: hourStartParse + i,
            end: hourStartParse + (i + 1),
            selected: false,
            disabled: true,
          };
        } else {
          option = {
            start: hourStartParse + i,
            end: hourStartParse + (i + 1),
            selected: false,
          };
        }

        newOptions.push(option);
      }
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
  }, [date]);

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
        <div
          className="spaceView__header__titleTag"
          onClick={() => goBack(navigate)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft-white.svg`}
            alt=""
          />
          <p>Reservas</p>
        </div>

        <Image
          src={`${process.env.PUBLIC_URL}${space!.img}`}
          fallback={<Breathing className="spaceView__header__img" />}
          NativeImgProps={{
            className: "spaceView__header__img",
          }}
          fadeIn
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
              } else if (option.disabled) {
                return (
                  <ScheduleOption
                    key={i}
                    update={handleOptionClick}
                    start={option.start}
                    end={option.end}
                    index={i}
                    disabled
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
