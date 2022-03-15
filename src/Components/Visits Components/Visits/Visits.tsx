import * as React from "react";
import { useLocation, useNavigate } from "react-router";

import { getVisitorsCollection } from "../../../Firebase/firebaseApi";
import { visitor } from "../../../Types/visitor";
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
  const location = useLocation();
  const state = location.state as CustomizedState;

  const [visits, setVisits] = React.useState<visitor[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getBookings = async () => {
    const snapshot = await getVisitorsCollection;

    const newVisitors: visitor[] = [];

    snapshot.forEach((visitor: any) => {
      newVisitors.push({ ...visitor.data() });
    });

    setVisits(newVisitors);
    setLoading(false);
  };

  React.useEffect(() => {
    if (state !== null) {
      const { reload } = state;

      console.log(reload);

      if (reload) {
        navigate("", { state: { reload: false } });
        navigate(0);
      }
    }

    getBookings();
  }, []);

  if (loading) {
    return (
      <section className="loading">
        <section className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </section>
      </section>
    );
  } else {
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
  }
};

export default Visits;
