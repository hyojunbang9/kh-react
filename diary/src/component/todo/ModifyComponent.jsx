import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import InfoModal from "../common/InfoModal";
import useMyMove from "../../hooks/useMyMove";
import "./ModifyComponent.css";

const initState = {
  tno: 0,
  done: false,
  ttitle: "",
  twriter: "",
  tcontent: "",
  dueDate: null,
};

const ModifyComponent = ({ tno }) => {
  const { moveToTodoList } = useMyMove();
  const [todo, setTodo] = useState({ ...initState });
  const [infoModalOn, setInfoModalOn] = useState(false);
  const [result, setResult] = useState(null); //모달 창을 위한 상태

  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
  }, [tno]);

  // 수정 버튼 클릭시
  const handleClickModify = () => {
    putOne(todo).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  // 삭제 버튼 클릭시
  const handleClickDelete = () => {
    deleteOne(tno).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };

  //모달창을 close
  const closeModal = () => {
    setInfoModalOn(false);
    moveToTodoList();
  };

  return (
    <Container className="modify-container">
      <InfoModal
        show={infoModalOn}
        title={`RESULT`}
        content={`${result}`}
        callbackFn={closeModal}
      />
      <div className="modify-header">TODO 수정🫠</div>
      <Form className="modify-form">
        <Form.Group className="mb-3">
          <Form.Label>번호</Form.Label>
          <Form.Control value={tno} type="text" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="done"
            label="완료 여부"
            checked={todo.done}
            onChange={(e) => setTodo({ ...todo, done: e.target.checked })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="ttitle"
            value={todo.ttitle}
            placeholder="할 일을 한 줄로 요약하면?"
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>작성자</Form.Label>
          <Form.Control
            value={todo.twriter}
            type="text"
            placeholder="누가 작성했나요?"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            type="textarea"
            name="tcontent"
            value={todo.tcontent}
            placeholder="할 일에 대한 자세한 내용을 입력하세요."
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>마감 기한</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={handleChangeTodo}
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
            moveToTodoList();
          }}
        >
          목록
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
