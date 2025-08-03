import { useEffect, useState } from "react";
import { getOne } from "../../api/diaryApi";
import { Container } from "react-bootstrap";
import "./ReadComponent.css";
import rewardImage from "./img/goodBoy.jpg";

const initState = {
  dno: 0,
  dtitle: "",
  dwriter: "",
  dcontent: "",
  dweather: "",
  ddate: null,
};
const ReadComponent = ({ dno, moveToList, moveToModify }) => {
  const [diary, setDiary] = useState(initState);

  useEffect(() => {
    getOne(dno).then((data) => {
      console.log(data);
      setDiary(data);
    });
  }, [dno]);

  return (
    <Container className="p-5">
      <table>
        <tr>
          <td>{diary.dno}</td>
          <td colSpan={9}>오늘의 일기</td>
        </tr>
        <tr className="titleLine">
          <td colSpan={9} className="title">
            {diary.dtitle}
          </td>
          <td>{diary.dwriter}</td>
        </tr>
        <tr>
          <th></th>
          <th colSpan={5} className="content">
            {diary.dcontent}
          </th>
        </tr>
        <tr className="dateLine">
          <td colSpan={5}>날씨☀️</td>
          <td colSpan={5}>{diary.ddate}</td>
        </tr>
        <tr>
          <td colSpan={7} className="weather">
            {diary.dweather}
          </td>
          <td colSpan={3} className="goodJob">
            <img src={rewardImage} style={{ width: "100px" }} alt="goodBoy" />
          </td>
        </tr>
      </table>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToModify(dno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            moveToList();
          }}
        >
          목록가기
        </button>
      </div>
    </Container>
  );
};
export default ReadComponent;
