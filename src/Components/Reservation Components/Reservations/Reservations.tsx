import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validateUserState } from "../../../Firebase/firebaseApi";
import { AppState } from "../../../Redux/Reducers";
import Btn from "../../UI/Buttons/Btn";
import Header from "../../UI/Header/Header";
import ReservationCard from "../ReservationCard/ReservationCard";

import "./Reservations.css";

interface ReservationsProps {}

const Reservations: React.FC<ReservationsProps> = () => {
  const navigate = useNavigate();

  const bookings = useSelector<AppState, AppState["bookings"]>(
    (state) => state.bookings
  );

  React.useEffect(() => {
    validateUserState(navigate);
  }, []);

  return (
    <article>
      <Header />
      <h1>Reservar zonas comunes</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column bookingList">
          {bookings.length === 0 ? (
            <p
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              Aún no has reservado ninguna zona común. Presiona el botón
              “reservar” para crear una nueva reserva.
            </p>
          ) : (
            bookings.map((booking, i) => {
              return (
                <ReservationCard
                  key={i}
                  spaceId={booking.spaceId}
                  dateStart={booking.dateStart}
                  dateEnd={booking.dateEnd}
                />
              );
            })
          )}
          <Btn
            text="+ Reservar"
            variant="add"
            action={function (): void {
              navigate("/Reservas/list");
            }}
          />
        </div>
      </section>
    </article>
  );
};
export default Reservations;
