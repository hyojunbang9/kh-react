import { useEffect, useState } from "react";
import { getOne } from "../../api/momentApi";
import { API_SERVER_HOST } from "../../api/diaryApi";
import useCustomMove from "../../hooks/useMyMove";
import FetchingModal from "../common/FetchingModal";
import { Container, Form } from "react-bootstrap";

const initState = {
  mno: 0,
  mtitle: "",
  mcontent: "",
  mlocation: "",
  mdate: "",
  uploadFileNames: [],
};

const prefix = API_SERVER_HOST;

const ReadComponent = ({ mno }) => {
  const [moment, setMoment] = useState(initState);
  const { moveToMomentList, moveToMomentModify } = useCustomMove(); //화면 이동용 함수
  const [fetching, setFetching] = useState(false); //fetching
  useEffect(() => {
    setFetching(true);
    getOne(mno).then((data) => {
      setMoment(data);
      setFetching(false);
    });
  }, [mno]);

  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>MNO</Form.Label>
          <Form.Control
            value={mno}
            type="text"
            placeholder="Enter mno"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mtitle</Form.Label>
          <Form.Control
            value={moment.mtitle}
            type="text"
            placeholder="Enter mtitle"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mcontent</Form.Label>
          <Form.Control
            type="text"
            value={moment.mcontent}
            placeholder="Enter mcontent"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mlocation</Form.Label>
          <Form.Control
            type="text"
            value={moment.mlocation}
            placeholder="Enter mlocation"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          {moment.uploadFileNames.map((imgFile, i) => (
            <img
              alt="moment"
              key={i}
              style={{ width: "14rem", height: "14rem" }}
              src={`${prefix}/api/moment/view/s_${imgFile}`}
            />
          ))}
        </Form.Group>
        <Form.Group>
          <Form.Label>DATE</Form.Label>
          <Form.Control defaultValue={moment.mdate} type="text" disabled />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToMomentModify(mno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            moveToMomentList();
          }}
        ></button>
        리스트보기
      </div>
    </Container>
  );
};
export default ReadComponent;
