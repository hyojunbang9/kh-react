import { useEffect, useState } from "react";
import { getOne } from "../../api/todoApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import useMyMove from "../../hooks/useMyMove";
import "./ReadComponent.css";

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
    <Container className="read-container">
      <div className="read-header">{todo.tno}번 할 일🫠</div>
      <Form className="read-form">
        <Form.Group className="mb-3">
          <Form.Check
            name="done"
            type="checkbox"
            label="완료 여부"
            checked={todo.done}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>제목</Form.Label>
          <Form.Control
            value={todo.ttitle}
            type="text"
            placeholder="할 일을 한 줄로 요약하면?"
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>작성자</Form.Label>
          <Form.Control
            type="text"
            value={todo.twriter}
            placeholder="누가 작성했나요?"
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="text"
            value={todo.tcontent}
            placeholder="할 일에 대한 자세한 내용을 입력하세요."
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>기한</Form.Label>
          <Form.Control value={todo.dueDate} type="text" disabled />
        </Form.Group>
      </Form>
      <div className="read-buttons">
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            moveToTodoModify(tno);
          }}
        >
          수정
        </button>
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToTodoList();
          }}
        >
          목록
        </button>
      </div>
    </Container>
  );
};
export default ReadComponent;
