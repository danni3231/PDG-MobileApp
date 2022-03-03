import * as React from "react";
import Btn from "../../Buttons/Btn";

import "./SpaceView.css";

interface SpaceViewProps {}

const SpaceView: React.FC<SpaceViewProps> = ({}) => {
  const onSend = () => {};

  return (
    <article className="spaceView">
      <div className="spaceView__header">
        <img
          className="spaceView__header__img"
          src={`${process.env.PUBLIC_URL}/Img/pool.png`}
          alt=""
        />
        <div className="spaceView__header__content">
          <p>piscina</p>
        </div>
      </div>
      <form className="spaceView__form" action="">
        <h1>Ocupacion:</h1>
        <p>horario:</p>
        <p>luneas a domingo</p>
        <h1>Fecha de reserva</h1>
        <input type="date" name="" id="" />
        <h1>Horarios</h1>

        <Btn text="Confirmar" variant="" action={onSend}></Btn>
      </form>
    </article>
  );
};

export default SpaceView;
