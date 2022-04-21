import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { validateUserState } from "../../../Firebase/firebaseApi";
import { AppState } from "../../../Redux/Reducers";
import Chip from "../../UI/Chip/Chip";
import SpaceCard from "../SpaceCard/SpaceCard";

import "./SpaceList.css";

interface SpaceListProps {}

const SpaceList: React.FC<SpaceListProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const goBack = () => () => {
    navigate(-1);
  };

  return (
    <article className="spaceList">
      <Chip text="Reservas" />
      <p className="spaceList__title">Elige la zona que deseas reservar</p>

      <div className="scroll scroll--h">
        <div className="scroll__column spaceList__column">
          {spaces.map((space) => {
            return (
              <SpaceCard
                key={space.id}
                id={space.id}
                name={space.name}
                img={space.img}
                occupation={space.occupation}
                big
              />
            );
          })}
        </div>
      </div>
    </article>
  );
};

export default SpaceList;
