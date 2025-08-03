import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { postAdd } from "../../api/momentApi";
import FetchingModal from "../common/FetchingModal";
import InfoModal from "../common/InfoModal";
import useMyMove from "../../hooks/useMyMove";
import "./AddComponent.css";

const initState = {
  mtitle: "",
  mcontent: "",
  mlocation: "",
  mdate: "",
  files: [],
};

export default function AddComponent() {
  const [moment, setMoment] = useState({ ...initState });
  const uploadRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState(null);
  const { moveToMomentList } = useMyMove();

  const handleChangeMoment = (e) => {
    moment[e.target.name] = e.target.value;
    setMoment({ ...moment });
  };

  const handleClickAdd = (e) => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    formData.append("mtitle", moment.mtitle);
    formData.append("mcontent", moment.mcontent);
    formData.append("mlocation", moment.mlocation);
    formData.append("mdate", moment.mdate);
    setFetching(true);

    postAdd(formData)
      .then((data) => {
        setFetching(false);
        setResult(data.RESULT);
      })
      .catch((err) => {
        console.error("등록 실패:", err);
        setFetching(false);
        alert("등록 중 문제가 발생했습니다.");
      });
  };

  const closeModal = () => {
    setResult(null);
    moveToMomentList({ page: 1 });
  };

  return (
    <div className="add-container">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <InfoModal
          show={true}
          title={"Moment Add Result"}
          content={`${result}번 등록 완료`}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="add-header">순간의 기록📸</div>
      <Form className="add-form">
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="mtitle"
            type="text"
            value={moment.mtitle}
            onChange={handleChangeMoment}
            placeholder="'기록하고 싶은 이 순간'의 제목은?"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="mcontent"
            value={moment.mcontent}
            as="textarea"
            rows={4}
            placeholder="이 순간을 설명하자면?"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>위치</Form.Label>
          <Form.Control
            name="mlocation"
            type="text"
            value={moment.mlocation}
            onChange={handleChangeMoment}
            placeholder="어디서 있었던 일인가요?"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>날짜</Form.Label>
          <Form.Control
            name="mdate"
            type="date"
            value={moment.mdate}
            onChange={handleChangeMoment}
            placeholder="Enter mdate"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>사진</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple />
        </Form.Group>
      </Form>
      <div className="add-buttons">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
        <Button
          variant="secondary"
          type="button"
          onClick={() => moveToMomentList({ page: 1 })}
        >
          목록
        </Button>
      </div>
    </div>
  );
}
