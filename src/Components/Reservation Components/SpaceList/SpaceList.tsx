import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { AppState } from "../../../Redux/Reducers";
import SpaceCard from "../SpaceCard/SpaceCard";

import "./SpaceList.css";

interface SpaceListProps {}

const SpaceList: React.FC<SpaceListProps> = () => {
  const navigate = useNavigate();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const goBack = () => () => {
    navigate(-1);
  };

  return (
    <article className="spaceList">
      <img
        className="spaceList__backBtn"
        src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft.svg`}
        onClick={goBack()}
        alt="backBtn.png"
      />
      <h1>Elige la zona que deseas reservar</h1>

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
