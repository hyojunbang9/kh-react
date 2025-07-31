import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import InfoModal from "../common/InfoModal";
import useMyMove from "../../hooks/useMyMove";

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
    <Container className="p-5">
      <InfoModal
        show={infoModalOn}
        title={`RESULT`}
        content={`${result}`}
        callbackFn={closeModal}
      />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>tno</Form.Label>
          <Form.Control
            value={tno}
            type="text"
            placeholder="Enter tno"
            disabled
          />
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
          <Form.Label>ttitle</Form.Label>
          <Form.Control
            type="text"
            name="ttitle"
            value={todo.ttitle}
            placeholder="Enter ttitle"
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>twriter</Form.Label>
          <Form.Control
            value={todo.twriter}
            type="text"
            placeholder="Enter twriter"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>tcontent</Form.Label>
          <Form.Control
            type="textarea"
            name="tcontent"
            value={todo.tcontent}
            placeholder="Enter tcontent"
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dweather</Form.Label>
          <Form.Control
            type="text"
            name="dweather"
            value={todo.dweather}
            placeholder="Enter dweather"
            onChange={handleChangeTodo}
          />
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

        <button
          className="btn btn-primary"
          type="text"
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
export default ModifyComponent;
