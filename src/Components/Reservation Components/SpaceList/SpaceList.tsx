import * as React from "react";
import { getSpacesCollection } from "../../../Firebase/firebaseApi";
import { space } from "../../../Types/space";
import Gallery from "../../Gallery/Gallery";
import SpaceCard from "../SpaceCard/SpaceCard";

import "./SpaceList.css";

interface SpaceListProps {}

const SpaceList: React.FC<SpaceListProps> = () => {
  const [spaces, setSpaces] = React.useState<space[]>([]);

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
