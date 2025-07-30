import { useState, React } from "react";
import { Button, Container, Form } from "react-bootstrap";
import useMyMove from "../../hooks/useMyMove";
import { postAdd } from "../../api/diaryApi";
import InfoModal from "../common/InfoModal";

const initState = {
  dtitle: "",
  dwriter: "",
  dcontent: "",
  dweather: "",
  ddate: "",
};

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
          <Form.Label>dtitle</Form.Label>
          <Form.Control
            name="dtitle"
            type="text"
            value={diary.dtitle}
            onChange={handleChangediary}
            placeholder="Enter dtitle"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dwriter</Form.Label>
          <Form.Control
            name="dwriter"
            type="text"
            value={diary.dwriter}
            onChange={handleChangediary}
            placeholder="Enter dwriter"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dcontent</Form.Label>
          <Form.Control
            name="dcontent"
            type="text"
            value={diary.dcontent}
            onChange={handleChangediary}
            placeholder="Enter dcontent"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dweather</Form.Label>
          <Form.Control
            name="dweather"
            type="text"
            value={diary.dweather}
            onChange={handleChangediary}
            placeholder="Enter dweather"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>ddate</Form.Label>
          <Form.Control
            name="ddate"
            type="date"
            value={diary.ddate}
            onChange={handleChangediary}
            placeholder="Enter ddate"
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
