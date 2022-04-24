import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validateUserState } from "../../../Firebase/firebaseApi";
import { AppState } from "../../../Redux/Reducers";

import Btn from "../../UI/Buttons/Btn";
import Chip from "../../UI/Chip/Chip";
import Header from "../../UI/Header/Header";
import VisitCard from "../VisitCard/VisitCard";

import "./Visits.css";

interface VisitsProps {}

interface CustomizedState {
  reload: boolean;
}

const Visits: React.FC<VisitsProps> = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const visits = useSelector<AppState, AppState["visits"]>(
    (state) => state.visits
  );

  return (
    <article>
      <Chip text="Visitas" />
      <h1>Tus visitas agendadas</h1>
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
                  id={visitor.id}
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
