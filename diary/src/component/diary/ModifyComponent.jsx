import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/diaryApi";
import InfoModal from "../common/InfoModal";

const initState = {
  dno: 0,
  dtitle: "",
  dwriter: "",
  dcontent: "",
  dweather: "",
  ddate: null,
};

const ModifyComponent = ({ dno, moveToList, moveToRead }) => {
  const [diary, setDiary] = useState({ ...initState });
  const [infoModalOn, setInfoModalOn] = useState(false);
  const [result, setResult] = useState(null); //모달 창을 위한 상태

  useEffect(() => {
    getOne(dno).then((data) => setDiary(data));
  }, [dno]);

  // 수정 버튼 클릭시
  const handleClickModify = () => {
    putOne(diary).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  // 삭제 버튼 클릭시
  const handleClickDelete = () => {
    deleteOne(dno).then((data) => {
      setResult(data.RESULT);
      setInfoModalOn(true);
    });
  };

  const handleChangeDiary = (e) => {
    diary[e.target.name] = e.target.value;
    setDiary({ ...diary });
  };

  //모달창을 close
  const closeModal = () => {
    setInfoModalOn(false);
    moveToList();
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
          <Form.Label>dno</Form.Label>
          <Form.Control
            value={dno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dtitle</Form.Label>
          <Form.Control
            type="text"
            name="dtitle"
            value={diary.dtitle}
            placeholder="Enter dtitle"
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dwriter</Form.Label>
          <Form.Control
            value={diary.dwriter}
            type="text"
            placeholder="Enter dwriter"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dcontent</Form.Label>
          <Form.Control
            type="textarea"
            name="dtitle"
            value={diary.dcontent}
            placeholder="Enter dcontent"
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>dweather</Form.Label>
          <Form.Control
            type="text"
            name="dweather"
            value={diary.dweather}
            placeholder="Enter dweather"
            onChange={handleChangeDiary}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>ddate</Form.Label>
          <Form.Control
            name="ddate"
            value={diary.ddate}
            type="date"
            onChange={handleChangeDiary}
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
