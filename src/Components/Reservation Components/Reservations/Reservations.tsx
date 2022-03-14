import * as React from "react";
import { useLocation, useNavigate } from "react-router";
import { getBookingsCollection } from "../../../Firebase/firebaseApi";
import { booking } from "../../../Types/booking";
import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";
import ReservationCard from "../ReservationCard/ReservationCard";

import "./Reservations.css";

interface ReservationsProps {}

interface CustomizedState {
  reload: boolean;
}

const Reservations: React.FC<ReservationsProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CustomizedState;

  const [loading, setLoading] = React.useState(false);
  const [reservations, setReservations] = React.useState<booking[]>([]);

  const getBookings = async () => {
    const snapshot = await getBookingsCollection;

    const newBookings: booking[] = [];

    snapshot.forEach((booking: any) => {
      newBookings.push({ ...booking.data() });
    });

    setReservations(newBookings);
  };

  React.useEffect(() => {
    getBookings();

    if (state !== null) {
      const { reload } = state;

      console.log(reload);

      if (reload) {
        navigate("", { state: { reload: false } });
        navigate(0);
      }
    }
  }, []);

  return (
    <article>
      <Header />
      <h1>Reservar zonas comunes</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column bookingList">
          {reservations.length === 0 ? (
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
            reservations.map((reservation, i) => {
              return (
                <ReservationCard
                  key={i}
                  spaceId={reservation.spaceId}
                  dateStart={reservation.dateStart}
                  dateEnd={reservation.dateEnd}
                />
              );
            })
          )}
          <Btn
            text="Reservar"
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
