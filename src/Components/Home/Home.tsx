import * as React from 'react';
import Header from '../Header/Header';

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({ }) => {

    return (

        <article>
            <Header />
            <h1>
                Hola Sr. Mejía, <br />
                ¿qué quiere hacer hoy?
            </h1>

        </article>


    );
}

export default Home;