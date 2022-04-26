import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../../Firebase/firebaseApi";
import { AppState } from "../../../Redux/Reducers";
import { useOnClickOutside } from "../../../Utils/GeneralFunctions";

import "./SideTab.css";

interface SideTabProps {
  action: () => void;
}

const SideTab: React.FC<SideTabProps> = ({ action }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector<AppState, AppState["currentUser"]>(
    (state) => state.currentUser
  );

  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => action());

  return (
    <div className="sideTab" ref={ref}>
      <div className="sideTab__header">
        <img
          src={`${process.env.PUBLIC_URL}/Icons/logos/logo__large.svg`}
          className="sideTab__header__logo"
          alt=""
        />

        <div className="sideTab__header__user">
          <img
            src={currentUser.profileImg}
            alt=""
            className="sideTab__header__user__img"
          />
          <div className="sideTab__header__user__info">
            <p className="sideTab__header__user__info__name">
              {currentUser.firstname + " " + currentUser.lastname}
            </p>
            <p className="sideTab__header__user__info__apartment">
              {"Apto. " + currentUser.apartment}
            </p>
          </div>
        </div>
      </div>
      <div className="sideTab__nav">
        <div className="sideTab__nav__element">
          <img
            src={`${process.env.PUBLIC_URL}/Icons/creditCard.svg`}
            alt=""
            className="sideTab__nav__element__icon"
          />
          <p>Pagos</p>
        </div>
        <div className="sideTab__nav__element">
          <img
            src={`${process.env.PUBLIC_URL}/Icons/save.svg`}
            alt=""
            className="sideTab__nav__element__icon"
          />
          <p>Guardados</p>
        </div>
        <div className="sideTab__nav__element">
          <img
            src={`${process.env.PUBLIC_URL}/Icons/settings.svg`}
            alt=""
            className="sideTab__nav__element__icon"
          />
          <p>Configuración</p>
        </div>
        <div className="sideTab__nav__element">
          <img
            src={`${process.env.PUBLIC_URL}/Icons/privacity.svg`}
            alt=""
            className="sideTab__nav__element__icon"
          />
          <p>Privacidad</p>
        </div>
        <div className="sideTab__nav__element">
          <img
            src={`${process.env.PUBLIC_URL}/Icons/help.svg`}
            alt=""
            className="sideTab__nav__element__icon"
          />
          <p>Ayuda</p>
        </div>
      </div>
      <div
        className="sideTab__logoutBtn sideTab__nav__element"
        onClick={() => logout(dispatch, navigate)}
      >
        <img
          src={`${process.env.PUBLIC_URL}/Icons/logout.svg`}
          alt=""
          className="sideTab__nav__element__icon"
        />
        <p>Salir</p>
      </div>
    </div>
  );
};

export default SideTab;
