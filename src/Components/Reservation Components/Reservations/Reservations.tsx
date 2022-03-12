import * as React from "react";
import { useNavigate } from "react-router";
import { getBookingsCollection } from "../../../Firebase/firebaseApi";
import { booking } from "../../../Types/booking";
import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";
import ReservationCard from "../ReservationCard/ReservationCard";

interface ReservationsProps {}

const Reservations: React.FC<ReservationsProps> = () => {
  let navigate = useNavigate();

  const [reservations, setReservations] = React.useState<booking[]>([]);

  const getBookings = async () => {
    const snapshot = await getBookingsCollection;

    console.log(snapshot);

    const newBookings: booking[] = [];

    snapshot.forEach((booking: any) => {
      console.log(new Date(booking.data().dateStart * 1000));
      newBookings.push({ ...booking.data() });
    });

    setReservations(newBookings);
  };

  React.useEffect(() => {
    getBookings();
  }, []);

  return (
    <article>
      <Header />
      <h1>Reservar zonas comunes</h1>
      {reservations.length == 0 ? (
        <p
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
          Aún no has reservado ninguna zona común. Presiona el botón “reservar”
          para crear una nueva reserva.
        </p>
      ) : (
        reservations.map((reservation, i) => {
          return (
            <ReservationCard
              key={i}
              spaceid={reservation.spaceId}
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
    </article>
  );
};

export default Reservations;
