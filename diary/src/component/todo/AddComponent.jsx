import { useState, React } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useMyMove from "../../hooks/useMyMove";
import { postAdd } from "../../api/todoApi";
import InfoModal from "../common/InfoModal";

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
        console.log(result);
        setResult(result.TNO);
        setInfoModalOn(true);
        setTodo({ ...initState }); // 초기화
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(todo);
  };

  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
  };

  return (
    <Container className="p-5">
      <InfoModal
        show={infoModalOn}
        onHide={() => setInfoModalOn(false)}
        title={`ADD RESULT`}
        content={`New ${result} Added`}
        callbackFn={() => closeModal()}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Check
            name="done"
            type="checkbox"
            label="완료 여부"
            checked={todo.done} // boolean 값
            onChange={(e) => setTodo({ ...todo, done: e.target.checked })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ttitle</Form.Label>
          <Form.Control
            name="ttitle"
            type="text"
            value={todo.ttitle}
            onChange={handleChangetodo}
            placeholder="Enter ttitle"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>twriter</Form.Label>
          <Form.Control
            name="twriter"
            type="text"
            value={todo.twriter}
            onChange={handleChangetodo}
            placeholder="Enter twriter"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>tcontent</Form.Label>
          <Form.Control
            name="tcontent"
            type="text"
            value={todo.tcontent}
            onChange={handleChangetodo}
            placeholder="Enter tcontent"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>twriter</Form.Label>
          <Form.Control
            name="twriter"
            type="text"
            value={todo.twriter}
            onChange={handleChangetodo}
            placeholder="Enter twriter"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>dueDate</Form.Label>
          <Form.Control
            name="dueDate"
            type="date"
            value={todo.dueDate}
            onChange={handleChangetodo}
            placeholder="Enter dueDate"
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 ">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={() => {
            moveToList({ page: 1 });
          }}
        >
          목록
        </Button>
      </div>
    </Container>
  );
}
