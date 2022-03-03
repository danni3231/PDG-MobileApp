import * as React from "react";
import { Navigate, useNavigate } from "react-router";
import { getSpacesCollection } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import SpaceCard from "../SpaceCard/SpaceCard";

import "./SpaceList.css";

interface SpaceListProps {}

const SpaceList: React.FC<SpaceListProps> = () => {
  const navigate = useNavigate();
  const [spaces, setSpaces] = React.useState<space[]>([]);

  const goBack = () => () => {
    navigate(-1);
  };

  //  firebase //
  const getSpaces = async () => {
    const snapshot = await getSpacesCollection;

    const newSpaces: space[] = [];

    snapshot.forEach((space: any) => {
      newSpaces.push({ ...space.data(), id: space.id });
    });

    setSpaces(newSpaces);
  };

  React.useEffect(() => {
    getSpaces();
  }, []);

  return (
    <article className="spaceList">
      <img
        className="spaceList__backBtn"
        src={`${process.env.PUBLIC_URL}/Icons/Arrow - Left Circle.svg`}
        onClick={goBack()}
      />
      <h1>Elige la zona que deseas reservar</h1>

      <div className="scroll scroll--h">
        <div className="scroll__column">
          {spaces.map((space) => {
            return (
              <SpaceCard
                key={space.id}
                id={space.id}
                name={space.name}
                img={space.img}
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
