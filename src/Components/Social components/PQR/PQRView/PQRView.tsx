import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppState } from "../../../../Redux/Reducers";
import { pqr } from "../../../../Types/pqr";
import { User } from "../../../../Types/user";
import { goBack, parseDate } from "../../../../Utils/GeneralFunctions";

import "./PQRView.css";

interface PQRViewProps {}

const PQRView: React.FC<PQRViewProps> = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pqr = useSelector<AppState, pqr>(
    (state) => state.pqrs.find((pqr) => pqr.id == id)!!
  );

  const pqrWriter = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  return (
    <article className="pqrView">
      <div className="pqrView__header">
        <div
          className="pqrView__header__titleTag"
          onClick={() => goBack(navigate)}
        >
          <img
            src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft-white.svg`}
            alt=""
          />
          <p>PQRS</p>
        </div>

        <img className="pqrView__header__img " src={pqr.img} alt="" />
        <div className="pqrView__header__content">
          <p>{pqr.title}</p>
        </div>
      </div>

      <div className="scroll scroll--h">
        <div className="scroll__column pqrView__content">
          <div className="pqrView__content__user">
            <img
              className="pqrView__content__user__img"
              src={pqrWriter.profileImg}
              alt=""
            />
            <div className="pqrView__content__user__info">
              <p className="pqrView__content__user__name">
                {pqrWriter.firstname}
              </p>
              <p className="pqrView__content__user__date">
                {parseDate(pqr.date)}
              </p>
            </div>
          </div>
          <div className="pqrView__content__text">{pqr.content}</div>
        </div>
      </div>
    </article>
  );
};

export default PQRView;
