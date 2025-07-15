import "./DiaryItem.css";
import { getEmotionImages } from "../util/getEmotionImages";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate();

  const goDiaryPage = () => {
    nav(`/diary/${id}`);
  };
  const goEditPage = () => {
    nav(`/edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <section className="img_section" onClick={goDiaryPage}>
        <img src={getEmotionImages(emotionId)} />
      </section>
      <section className="info_section" onClick={goDiaryPage}>
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content"> {content}</div>
      </section>
      <section className="button_section" onClick={goEditPage}>
        <Button text={"수정하기"} />
      </section>
    </div>
  );
};
export default DiaryItem;
