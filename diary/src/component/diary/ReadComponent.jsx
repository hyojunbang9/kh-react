import { useEffect, useState } from "react";
import { getOne } from "../../api/diaryApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const initState = {
  dno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
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
      <Form>
        <Form.Group>
          <Form.Label>DNO</Form.Label>
          <Form.Control
            value={diary.dno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            value={diary.writer}
            type="text"
            placeholder="Enter writer"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type="text"
            value={diary.title}
            placeholder="Enter title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>DATE</Form.Label>
          <Form.Control value={diary.dueDate} type="text" disabled />
        </Form.Group>
        <Form.Group>
          <Form.Label>COMPLETE</Form.Label>
          <Form.Control
            value={diary.complete ? "Completed" : "Not Yet"}
            type="text"
          />
        </Form.Group>
      </Form>
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
