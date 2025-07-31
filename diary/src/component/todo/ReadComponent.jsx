import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useMyMove from "../../hooks/useMyMove";

const initState = {
  tno: 0,
  done: false,
  ttitle: "",
  twriter: "",
  tcontent: "",
  dueDate: "",
};
const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);
  const { moveToTodoList, moveToTodoModify } = useMyMove();

  useEffect(() => {
    getOne(tno).then((data) => {
      console.log(data);
      setTodo(data);
    });
  }, [tno]);

  return (
    <Container className="p-5">
      <Form>
        <Form.Group>
          <Form.Label>TNO</Form.Label>
          <Form.Control
            value={todo.tno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            name="done"
            type="checkbox"
            label="완료 여부"
            checked={todo.done}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ttitle</Form.Label>
          <Form.Control
            value={todo.ttitle}
            type="text"
            placeholder="Enter ttitle"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>twriter</Form.Label>
          <Form.Control
            type="text"
            value={todo.twriter}
            placeholder="Enter twriter"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>tcontent</Form.Label>
          <Form.Control
            type="text"
            value={todo.tcontent}
            placeholder="Enter tcontent"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>dueDate</Form.Label>
          <Form.Control value={todo.dueDate} type="text" disabled />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToTodoModify(tno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            moveToTodoList();
          }}
        >
          목록가기
        </button>
      </div>
    </Container>
  );
};
export default ReadComponent;
