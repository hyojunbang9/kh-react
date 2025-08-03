import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/diaryApi";
import InfoModal from "../common/InfoModal";
import "./ModifyComponent.css";

const initState = {
  dno: 0,
  dtitle: "",
  dwriter: "",
  dcontent: "",
  dweather: "",
  ddate: null,
};

const ModifyComponent = ({ dno, moveToList, moveToRead }) => {
  const [diary, setDiary] = useState({ ...initState });
  const [infoModalOn, setInfoModalOn] = useState(false);
  const [result, setResult] = useState(null); //모달 창을 위한 상태

  useEffect(() => {
    getOne(dno).then((data) => setDiary(data));
  }, [dno]);

  // 수정 버튼 클릭시
  const handleClickModify = () => {
    putOne(diary).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  // 삭제 버튼 클릭시
  const handleClickDelete = () => {
    deleteOne(dno).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  const handleChangeDiary = (e) => {
    diary[e.target.name] = e.target.value;
    setDiary({ ...diary });
  };

  //모달창을 close
  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
  };

  return (
    <Container className="modify-container">
      <InfoModal
        show={infoModalOn}
        title={`RESULT`}
        content={`${result}`}
        callbackFn={closeModal}
      />
      <div className="modify-header">DIARY 수정📝</div>
      <Form className="modify-form">
        <Form.Group className="mb-3">
          <Form.Label>{dno}번 일기</Form.Label>
          <Form.Control value={dno} type="text" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="dtitle"
            value={diary.dtitle}
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control value={diary.dwriter} type="text" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="textarea"
            name="dtitle"
            value={diary.dcontent}
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>날씨</Form.Label>
          <Form.Control
            type="text"
            name="dweather"
            value={diary.dweather}
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>날짜</Form.Label>
          <Form.Control
            name="ddate"
            value={diary.ddate}
            type="date"
            onChange={handleChangeDiary}
          />
        </Form.Group>
      </Form>
      <div className="modify-buttons">
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleClickModify}
        >
          수정
        </button>
        <button
          className="btn btn-delete"
          type="button"
          onClick={handleClickDelete}
        >
          삭제
        </button>

        <button
          className="btn btn-secondary"
          type="text"
          onClick={() => {
            moveToList();
          }}
        >
          목록
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
