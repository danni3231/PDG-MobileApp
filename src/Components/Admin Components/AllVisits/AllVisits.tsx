import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Reducers";
import ReservationCard from "../../Reservation Components/ReservationCard/ReservationCard";
import Chip from "../../UI/Chip/Chip";
import VisitCard from "../../Visits Components/VisitCard/VisitCard";

import "./AllVisits.css";

interface AllVisitsProps {}

const AllVisits: React.FC<AllVisitsProps> = ({}) => {
  const AllVisits = useSelector<AppState, AppState["allVisits"]>(
    (state) => state.allVisits
  );

  return (
    <article>
      <Chip text="Visitas" />
      <h1>Visitas</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column bookingList">
          {AllVisits.length === 0 ? (
            <p
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              Aún no se ha agendado ninguna visita.
            </p>
          ) : (
            AllVisits.map((visitor, i) => {
              return (
                <VisitCard
                  key={i}
                  id={visitor.id}
                  name={`${visitor.name} ${visitor.lastname}`}
                  typeId={visitor.ccType}
                  visitorId={visitor.cc}
                  date={visitor.date}
                />
              );
            })
          )}
        </div>
      </section>
    </article>
  );
};

export default AllVisits;
