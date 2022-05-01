import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../../Redux/Reducers";
import PQRCard from "../PQRCard/PQRCard";

import "./PQRList.css";

interface PQRListProps {}

const PQRList: React.FC<PQRListProps> = ({}) => {
  const navigate = useNavigate();

  const [filter, setFilter] = React.useState<
    "today" | "week" | "month" | "all"
  >("today");

  const pqrs = useSelector<AppState, AppState["pqrs"]>((state) => state.pqrs);

  const handlerFilter = (btnClicked: "today" | "week" | "month" | "all") => {
    setFilter(btnClicked);
  };

  return (
    <section className="PQRList">
      <div className="PQRList__nav">
        <div
          className="PQRList__nav__btn"
          onClick={() => handlerFilter("today")}
        >
          {filter === "today" ? (
            <>
              <p className="PQRList__nav__text PQRList__nav__text__active">
                Hoy
              </p>
              <hr className="PQRList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Hoy</p>
          )}
        </div>
        <div
          className="PQRList__nav__btn"
          onClick={() => handlerFilter("week")}
        >
          {filter === "week" ? (
            <>
              <p className="PQRList__nav__text PQRList__nav__text__active">
                Semana
              </p>
              <hr className="PQRList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Semana</p>
          )}
        </div>
        <div
          className="PQRList__nav__btn"
          onClick={() => handlerFilter("month")}
        >
          {filter === "month" ? (
            <>
              <p className="PQRList__nav__text PQRList__nav__text__active">
                Mes
              </p>
              <hr className="PQRList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Mes</p>
          )}
        </div>
        <div className="PQRList__nav__btn" onClick={() => handlerFilter("all")}>
          {filter === "all" ? (
            <>
              <p className="PQRList__nav__text PQRList__nav__text__active">
                Todas
              </p>
              <hr className="PQRList__nav__indicator" />
            </>
          ) : (
            <p className="socialNav__text ">Todas</p>
          )}
        </div>
      </div>

      <div className="scroll scroll--h PQRList__scroll">
        <div className="scroll__column PQRList__column">
          {pqrs.length === 0 ? (
            <p className="PQRList__column__onboarding">
              Aún no tienes una PQR. Si tienes alguna pregunta, queja o reclamo,
              presiona el botón flotante para crear una nueva PQR.
            </p>
          ) : (
            pqrs.map((pqr) => {
              if (pqr.img !== undefined) {
                return (
                  <PQRCard
                    key={pqr.id}
                    title={pqr.title}
                    img={pqr.img}
                    date={pqr.date}
                    id={pqr.id}
                  />
                );
              } else {
                return (
                  <PQRCard
                    key={pqr.id}
                    title={pqr.title}
                    content={pqr.content}
                    date={pqr.date}
                    id={pqr.id}
                  />
                );
              }
            })
          )}
        </div>
      </div>

      <div
        className="PQRList__btn"
        onClick={() => navigate("/Social/createPQR")}
      >
        <img src={`${process.env.PUBLIC_URL}/Icons/plus.svg`} alt="" />
      </div>
    </section>
  );
};

export default PQRList;
