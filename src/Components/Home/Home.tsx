import * as React from "react";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";
import { space } from "../../Types/space";

//firebase
import { getSpacesCollection } from "../../Firebase/firebaseApi";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
  const [spaces, setSpaces] = React.useState<space[]>([]);
  const [loading, setLoading] = React.useState(true);

  const getSpaces = async () => {
    const snapshot = await getSpacesCollection;

    const newSpaces: space[] = [];

    snapshot.forEach((space: any) => {
      newSpaces.push({ ...space.data(), id: space.id });
    });

    setSpaces(newSpaces);
    setLoading(false);
  };

  React.useEffect(() => {
    getSpaces();
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
          Hola Sr. Mejía, <br />
          ¿qué quiere hacer hoy?
        </h1>

        <Gallery
          title="Reservar un espacio"
          list={spaces}
          url={"Reservas/list"}
        />
        <div className="comingSoon">
          <h1 className="textLoading">Coming Soon...</h1>
        </div>
      </article>
    );
  }
};

export default Home;
