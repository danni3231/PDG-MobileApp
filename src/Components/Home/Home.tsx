import * as React from "react";
import Gallery from "../UI/Gallery/Gallery";
import Header from "../UI/Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../Redux/Reducers";
import {
  getBookings,
  getSpaces,
  getVisits,
  validateUserState,
} from "../../Firebase/firebaseApi";
import { useNavigate } from "react-router";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaces = useSelector<AppState, AppState["spaces"]>(
    (state) => state.spaces
  );

  const user = useSelector<AppState, AppState["user"]>((state) => state.user);

  const [loading, setLoading] = React.useState(true);

  const testNoticeCard = [
    {
      title: "noticia 1",
      img: "/Img/field.png",
      id: "0",
      content:
        "En el pasillo principal del tercer piso del edificio H hay ya desde hace semanas, una gotera que está generando humendad en el techo y no ha sido arreglada. La gotera está muy cerca de la puerta de mi apartamento y cuando llueve muy fuerte, el agua entra por la puerta. Solicito a los vecinos que se unan a mi petición porque no soy el único afectado y, a la administración, que por favor dé solución a este problema lo más pronto posible porque afecta gravemente la calidad de vida.",
    },
  ];

  React.useEffect(() => {
    validateUserState(navigate, dispatch);

    console.log(user);
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
      <article className="home">
        <Header />
        <h1>
          Hola Sr. {`${user.firstname} ${user.lastname}`}, <br />
          ¿qué quiere hacer hoy?
        </h1>

        <Gallery
          title="Reservar un espacio"
          listSpace={spaces}
          url={"Reservas/list"}
        />

        <Gallery
          title="Noticias"
          listNotice={testNoticeCard}
          url={"Social"}
          isNotice
        />
      </article>
    );
  }
};
export default Home;
