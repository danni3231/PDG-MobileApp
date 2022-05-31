import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../Redux/Reducers";
import ReservationCard from "../../Reservation Components/ReservationCard/ReservationCard";
import Btn from "../../UI/Buttons/Btn";
import Chip from "../../UI/Chip/Chip";

import "./AllReservations.css";

interface AllReservationsProps {}

const AllReservations: React.FC<AllReservationsProps> = ({}) => {
  const AllBookings = useSelector<AppState, AppState["allBookings"]>(
    (state) => state.allBookings
  );

  return (
    <article>
      <Chip text="Reservas" />
      <h1>Reservas de zonas</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column bookingList">
          {AllBookings.length === 0 ? (
            <p
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              Aún no se ha reservado ninguna zona común.
            </p>
          ) : (
            AllBookings.map((booking, i) => {
              return (
                <ReservationCard
                  key={i}
                  id={booking.id}
                  spaceId={booking.spaceId}
                  dateStart={booking.dateStart}
                  dateEnd={booking.dateEnd}
                />
              );
            })
          )}
        </div>
      </section>
    </article>
  );
};

export default AllReservations;
