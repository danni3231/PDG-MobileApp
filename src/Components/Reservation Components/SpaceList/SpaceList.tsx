import * as React from "react";
import { space } from "../../../Types/space";

import "./SpaceList.css";

interface SpaceListProps {
  list: space[];
}

const SpaceList: React.FC<SpaceListProps> = ({ list }) => {
  return (
    <section>
      {list.map((space) => {
        return;
      })}
    </section>
  );
};

export default SpaceList;
