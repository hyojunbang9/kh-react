import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/diaryApi";
import InfoModal from "../common/InfoModal";

const initState = {
  dno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};

const ModifyComponent = ({ dno, moveToList, moveToRead }) => {
  const [diary, setDiary] = useState({ ...initState });
  const [infoModalOn, setInfoModalOn] = useState(false);
  const [result, setResult] = useState(null); //모달 창을 위한 상태

  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(diary).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };
  const handleClickDelete = () => {
    // 삭제 버튼 클릭시
    deleteOne(diary).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  useEffect(() => {
    getOne(dno).then((data) => setDiary(data));
  }, [dno]);

  const handleChangeDiary = (e) => {
    diary[e.target.name] = e.target.value;
    setDiary({ ...diary });
  };

  const handleChangeDiaryComplete = (e) => {
    const value = e.target.value;
    diary.complete = value === "Y" ? "true" : "false";
    setDiary({ ...diary });
  };

  //모달창을 close
  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
  };

  return (
    <Container className="p-5">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>dno</Form.Label>
          <Form.Control
            value={dno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            value={diary.writer}
            type="text"
            placeholder="Enter writer"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={diary.title}
            placeholder="Enter title"
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="dueDate"
            value={diary.dueDate}
            type="date"
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>COMPLETE</Form.Label>
          <Form.Select
            name="status"
            value={diary.complete ? "Completed" : "Not Yet"}
            onChange={handleChangeDiaryComplete}
          >
            <option value="Y">Completed</option>
            <option value="N">Not Yet</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={handleClickModify}
        >
          수정하기
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleClickDelete}
        >
          삭제하기
        </button>
        목록가기
        <button
          className="btn btn-primary"
          type="text"
          onClick={() => {
            moveToList();
          }}
        ></button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
