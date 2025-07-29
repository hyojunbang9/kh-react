import { useState, React } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useCustomMove from "../../hooks/useMyMove";
import { postAdd } from "../../api/diaryApi";
import InfoModal from "../common/InfoModal";

const initState = { title: "", writer: "", dueDate: "" };

export default function AddComponent() {
  const [diary, setdiary] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const { moveToList } = useMyMove();
  const [infoModalOn, setInfoModalOn] = useState(false);
  const handleChangediary = (e) => {
    diary[e.target.name] = e.target.value;
    setdiary({ ...diary });
  };

  const handleClickAdd = () => {
    postAdd(diary)
      .then((result) => {
        console.log(result);
        setResult(result.DNO);
        setInfoModalOn(true);
        setdiary({ ...initState }); // 초기화
      })
      .catch((e) => {
        console.error(e);
      });
    console.log(diary);
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
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            name="title"
            type="text"
            value={diary.title}
            onChange={handleChangediary}
            placeholder="Enter Title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>WRITER</Form.Label>
          <Form.Control
            name="writer"
            type="text"
            value={diary.writer}
            onChange={handleChangediary}
            placeholder="Enter Writer"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>DUEDATE</Form.Label>
          <Form.Control
            name="dueDate"
            type="date"
            value={diary.dueDate}
            onChange={handleChangediary}
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
