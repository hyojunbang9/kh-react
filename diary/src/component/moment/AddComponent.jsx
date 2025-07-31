import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { postAdd } from "../../api/momentApi";
import FetchingModal from "../common/FetchingModal";
import InfoModal from "../common/InfoModal";
import useMyMove from "../../hooks/useMyMove";

const initState = {
  mtitle: "",
  mcontent: "",
  mlocation: "",
  mdate: "",
  files: [],
};

export default function AddComponent() {
  const [moment, setMoment] = useState({ ...initState });
  const uploadRef = useRef(); //type =”file” 위치
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

    //other data
    formData.append("mtitle", moment.mtitle);
    formData.append("mcontent", moment.mcontent);
    formData.append("mlocation", moment.mlocation);
    formData.append("mdate", moment.mdate);
    console.log(formData);
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
    <Container className="p-5">
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>moment Title</Form.Label>
          <Form.Control
            name="mtitle"
            type="text"
            value={moment.mtitle}
            onChange={handleChangeMoment}
            placeholder="Enter mtitle"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>moment Content</Form.Label>
          <Form.Control
            name="mcontent"
            value={moment.mcontent}
            as="textarea"
            rows={4}
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mlocation</Form.Label>
          <Form.Control
            name="mlocation"
            type="text"
            value={moment.mlocation}
            onChange={handleChangeMoment}
            placeholder="Enter mlocation"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="mdate"
            type="date"
            value={moment.mdate}
            onChange={handleChangeMoment}
            placeholder="Enter mdate"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 ">
        <Button variant="primary" type="button" onClick={handleClickAdd}>
          저장
        </Button>
      </div>
    </Container>
  );
}
