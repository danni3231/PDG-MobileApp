import * as React from "react";
import { useNavigate } from "react-router";
import { visitor } from "../../../Types/visitor";
import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";

interface VisitsProps {}

const Visits: React.FC<VisitsProps> = ({}) => {
  let navigate = useNavigate();
  const [reservations, setReservations] = React.useState<visitor[]>([]);

  return (
    <article>
      <Header />
      <h1>Agendar visitas</h1>
      {reservations.length == 0 ? (
        <p
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
          Aún no has agendado ninguna visita. Presiona el botón “agendar” para
          crear una nueva visita.
        </p>
      ) : (
        reservations.map((reservation) => {
          return; //reservation card
        })
      )}
      <Btn
        text="Agendar"
        variant="add"
        action={function (): void {
          navigate("/Visitas/form");
        }}
      />
    </article>
  );
};

export default Visits;
