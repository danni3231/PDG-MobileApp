import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../../Redux/Reducers";
import NewsPreview from "../NewsCardLarge/NewsPreview";

import "./NewsList.css";

interface NewsListProps {}

const NewsList: React.FC<NewsListProps> = ({}) => {
  const news = useSelector<AppState, AppState["news"]>((state) => state.news);

  return (
    <section className="newsList">
      <p>hoy</p>

      <div className="scroll scroll--h newsList__scroll">
        <div className="scroll__column newsList__column">
          {news.map((news) => {
            return (
              <NewsPreview
                title={news.title}
                img={news.img}
                date={news.date}
                id={news.id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
