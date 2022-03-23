import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../Redux/Reducers";

import Btn from "../../Buttons/Btn";
import Header from "../../Header/Header";
import VisitCard from "../VisitCard/VisitCard";

import "./Visits.css";

interface VisitsProps {}

interface CustomizedState {
  reload: boolean;
}

const Visits: React.FC<VisitsProps> = ({}) => {
  const navigate = useNavigate();

  const visits = useSelector<AppState, AppState["visits"]>(
    (state) => state.visits
  );

  return (
    <article>
      <Header />
      <h1>Agendar visitas</h1>
      <section className="scroll scroll--h">
        <div className="scroll__column visitList">
          {visits.length == 0 ? (
            <p
              style={{
                width: "90%",
                alignSelf: "center",
              }}
            >
              Aún no has agendado ninguna visita. Presiona el botón “agendar”
              para crear una nueva visita.
            </p>
          ) : (
            visits.map((visitor, i) => {
              return (
                <VisitCard
                  key={i}
                  name={visitor.name}
                  typeId={visitor.ccType}
                  visitorId={visitor.cc}
                  date={visitor.date}
                />
              );
            })
          )}
          <Btn
            text="+ Agendar"
            variant="add"
            action={function (): void {
              navigate("/Visitas/form");
            }}
          />
        </div>
      </section>
    </article>
  );
};
export default Visits;
