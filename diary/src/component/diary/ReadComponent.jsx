import { useEffect, useState } from "react";
import { getOne } from "../../api/diaryApi";
import { Container } from "react-bootstrap";
import "./ReadComponent.css";

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
          <th>{diary.dno}</th>
          <th colSpan={9}>오늘의 일기</th>
        </tr>
        <tr>
          <td colSpan={9}></td>
          <td>{diary.dwriter}</td>
        </tr>
        <tr>
          <td></td>
          <td colSpan={5}>{diary.dtitle}</td>
        </tr>
        <tr>
          <td colSpan={5}>{diary.dweather}</td>
          <td colSpan={5}>{diary.ddate}</td>
        </tr>
        <tr>
          <td colSpan={7}>d</td>
          <td colSpan={3}>d</td>
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
