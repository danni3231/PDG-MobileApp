import * as React from "react";
import { useNavigate } from "react-router";
import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";

interface ReservationsProps {
  reservations: any[];
}

const Reservations: React.FC<ReservationsProps> = ({ reservations }) => {
  let navigate = useNavigate();

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
