import * as React from "react";
import { useNavigate } from "react-router";
import { getSpacesCollection } from "../../../Firebase/firebaseApi";
import { booking } from "../../../Types/booking";
import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";

interface ReservationsProps {}

const Reservations: React.FC<ReservationsProps> = () => {
  let navigate = useNavigate();

  const [reservations, setReservations] = React.useState<booking[]>([]);

  const getBookings = async () => {
    const snapshot = await getSpacesCollection;

    const newBookings: booking[] = [];

    snapshot.forEach((space: any) => {
      console.log(space.bookings);
      //newBookings.push({ ...space.data(), id: space.id });
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
        reservations.map((reservation) => {
          return; //reservation card
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
