import { useEffect, useState } from "react";
import { getOne } from "../../api/momentApi";
import { API_SERVER_HOST } from "../../api/diaryApi";
import useCustomMove from "../../hooks/useMyMove";
import FetchingModal from "../common/FetchingModal";
import { Container, Form } from "react-bootstrap";
import "./ReadComponent.css";

const initState = {
  mno: 0,
  mtitle: "",
  mcontent: "",
  mlocation: "",
  mdate: "",
  uploadFileNames: [],
};

const prefix = API_SERVER_HOST;

const ReadComponent = ({ mno }) => {
  const [moment, setMoment] = useState(initState);
  const { moveToMomentList, moveToMomentModify } = useCustomMove(); //화면 이동용 함수
  const [fetching, setFetching] = useState(false); //fetching

  useEffect(() => {
    setFetching(true);
    getOne(mno).then((data) => {
      setMoment(data);
      setFetching(false);
    });
  }, [mno]);

  return (
    <Container className="read-container">
      {fetching ? <FetchingModal /> : <></>}
      <div className="read-header">{mno}번 순간📸</div>
      <Form className="read-form">
        <Form.Group className="mb-3"></Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            value={moment.mtitle}
            type="text"
            placeholder="오늘의 순간을 한 줄로 요약하면?"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          {moment.uploadFileNames.map((imgFile, i) => (
            <img
              alt="moment"
              key={i}
              style={{ width: "14rem", height: "14rem" }}
              src={`${prefix}/api/moment/view/s_${imgFile}`}
            />
          ))}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="text"
            value={moment.mcontent}
            placeholder="오늘의 순간은 어땠나요?"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>장소</Form.Label>
          <Form.Control
            type="text"
            value={moment.mlocation}
            placeholder="어디에서 일어난 순간인가요?"
            disabled
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>날짜</Form.Label>
          <Form.Control defaultValue={moment.mdate} type="text" disabled />
        </Form.Group>
      </Form>
      <div className="read-buttons">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            moveToMomentModify(mno);
          }}
        >
          수정
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToMomentList();
          }}
        >
          목록
        </button>
      </div>
    </Container>
  );
};
export default ReadComponent;
