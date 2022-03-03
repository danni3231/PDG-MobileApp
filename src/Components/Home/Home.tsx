import * as React from "react";
import Gallery from "../Gallery/Gallery";
import Header from "../Header/Header";
import { space } from "../../Types/space";

//firebase
import { getSpacesCollection } from "../../Firebase/firebaseApi";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({}) => {
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
    </article>
  );
};

export default Home;
