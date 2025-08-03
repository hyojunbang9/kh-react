import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useMyMove from "../../hooks/useMyMove";
import { postAdd } from "../../api/todoApi";
import InfoModal from "../common/InfoModal";
import "./AddComponent.css";

const initState = {
  done: false,
  ttitle: "",
  twriter: "",
  tcontent: "",
  dueDate: "",
};

export default function AddComponent() {
  const [todo, setTodo] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const { moveToList } = useMyMove();
  const [infoModalOn, setInfoModalOn] = useState(false);

  const handleChangetodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  const handleClickAdd = () => {
    postAdd(todo)
      .then((result) => {
        setResult(result.TNO);
        setInfoModalOn(true);
        setTodo({ ...initState });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
  };

  return (
    <div className="add-container">
      <InfoModal
        show={infoModalOn}
        onHide={() => setInfoModalOn(false)}
        title={`ADD RESULT`}
        content={`New ${result} Added`}
        callbackFn={() => closeModal()}
      />
      <div className="add-header">해야할 일...🫠</div>
      <Form className="add-form">
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="ttitle"
            type="text"
            value={todo.ttitle}
            onChange={handleChangetodo}
            placeholder="해야할 일을 한 줄로 정리"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="tcontent"
            value={todo.tcontent}
            onChange={handleChangetodo}
            placeholder="어떤 일인가요?"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>해야하는 사람</Form.Label>
          <Form.Control
            name="twriter"
            type="text"
            value={todo.twriter}
            onChange={handleChangetodo}
            placeholder="해야하는 사람"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>마감 기한</Form.Label>
          <Form.Control
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChangetodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            name="done"
            type="checkbox"
            label="완료 여부"
            checked={todo.done}
            onChange={(e) => setTodo({ ...todo, done: e.target.checked })}
          />
        </Form.Group>
      </Form>
      <div className="add-buttons">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => moveToList({ page: 1 })}
        >
          목록
        </Button>
      </div>
    </div>
  );
}
