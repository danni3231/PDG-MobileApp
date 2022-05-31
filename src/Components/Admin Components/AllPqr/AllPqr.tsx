import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Reducers";
import ReservationCard from "../../Reservation Components/ReservationCard/ReservationCard";
import PQRCard from "../../Social components/PQR/PQRCard/PQRCard";
import Chip from "../../UI/Chip/Chip";

import "./AllPqr.css";

interface AllPqrProps {}

const AllPqr: React.FC<AllPqrProps> = ({}) => {
  const AllPqrs = useSelector<AppState, AppState["allpqrs"]>(
    (state) => state.allpqrs
  );

  return (
    <article>
      <Chip text="Reservas" />
      <h1>Reservas de zonas</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column bookingList">
          {AllPqrs.length === 0 ? (
            <p
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              Aún no se ha reservado ninguna zona común.
            </p>
          ) : (
            AllPqrs.map((pqr, i) => {
              return (
                <PQRCard
                  key={pqr.id}
                  title={pqr.title}
                  content={pqr.content}
                  date={pqr.date}
                  id={pqr.id}
                />
              );
            })
          )}
        </div>
      </section>
    </article>
  );
};

export default AllPqr;
