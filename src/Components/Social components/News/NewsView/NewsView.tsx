import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { AppState } from "../../../../Redux/Reducers";
import { news } from "../../../../Types/news";
import { goBack, lineBreak } from "../../../../Utils/GeneralFunctions";

import "./NewsView.css";

interface NewsViewProps {}

const NewsView: React.FC<NewsViewProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const news: news | undefined = useSelector<AppState, news | undefined>(
    (state) => state.news.find((news) => news.id === id!)
  );

  const dateParse = new Date(news?.date! * 1000);
  const dateString = `${dateParse.getDate()}/${
    dateParse.getMonth() + 1
  }/${dateParse.getFullYear()} - ${dateParse.getHours()}:${dateParse.getMinutes()} `;

  const textParse = lineBreak(news?.content!);

  return (
    <article className="newsView">
      <div className="newsView__header">
        <div className="newsView__header__titleTag" onClick={()=>goBack(navigate)}>
          <img
            src={`${process.env.PUBLIC_URL}/Icons/ArrowLeft-white.svg`}
            alt=""
          />
          <p>Noticias</p>
        </div>

        <img className="newsView__header__img " src={news?.img} alt="" />
        <div className="newsView__header__content">
          <p>{news?.title}</p>
        </div>
      </div>

      <div className="scroll scroll--h">
        <div className="scroll__column newsView__content">
          <div className="newsView__content__user">
            <p className="newsView__content__user__img">{news?.writer[0]}</p>
            <div className="newsView__content__user__info">
              <p className="newsView__content__user__name">{news?.writer}</p>
              <p className="newsView__content__user__date">{dateString}</p>
            </div>
          </div>
          <div className="newsView__content__text">
            {textParse.map((paragraph, i) => {
              if (paragraph.endsWith("* ")) {
                return (
                  <p className="bold" key={i}>
                    {paragraph.slice(0, -2)}
                  </p>
                );
              } else {
                return <p key={i}>{paragraph}</p>;
              }
            })}
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsView;
