import { useEffect, useState } from "react";
import { deleteOne, getOne, putOne } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import ResultModal from "../ResultModal";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: "",
  complete: false,
};
const ModifyComponent = ({ tno }) => {
  const [todo, setTodo] = useState({ ...initState });
  const [result, setResult] = useState(null); //모달 창을 위한 상태
  const { moveToList, moveToRead } = useCustomMove(); //이동을 위한 기능들
  useEffect(() => {
    getOne(tno).then((data) => setTodo(data));
  }, [tno]);
  const handleClickModify = () => {
    // 수정 버튼 클릭시
    putOne(todo).then((data) => {
      console.log("modify result: " + data);
      setResult("Modified");
    });
  };
  const handleClickDelete = () => {
    // 삭제 버튼 클릭시
    deleteOne(tno).then((data) => {
      console.log("delete result: " + data);
      setResult("Deleted");
    });
  };
  const closeModal = () => {
    if (result === "Deleted") {
      moveToList();
    } else {
      moveToRead(tno);
    }
  };
  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value;
    setTodo({ ...todo });
  };
  const handleChangeTodoComplete = (e) => {
    const value = e.target.value;
    todo.complete = value === "Y";
    setTodo({ ...todo });
  };
  return (
    <Container className="p-5">
      {result ? (
        <ResultModal
          title={"처리결과"}
          content={result}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>TNO</Form.Label>
          <Form.Control
            defaultValue={tno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            defaultValue={todo.writer}
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
            defaultValue={todo.title}
            placeholder="Enter title"
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="dueDate"
            value={todo.dueDate}
            type="date"
            onChange={handleChangeTodo}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>COMPLETE</Form.Label>
          <Form.Select
            name="status"
            defaultValue={todo.complete ? "Completed" : "Not Yet"}
            onChange={handleChangeTodoComplete}
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
        <button
          className="btn btn-primary"
          type="text"
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
export default ModifyComponent;
