import { useEffect, useState, useRef } from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/momentApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/diaryApi";
import useMyMove from "../../hooks/useMyMove";
import InfoModal from "../common/InfoModal";

const initState = {
  mno: 0,
  mtitle: "",
  mcontent: "",
  mlocation: "",
  mdate: "",
  uploadFileNames: [],
};

const prefix = API_SERVER_HOST;

const ModifyComponent = ({ mno }) => {
  const [moment, setMoment] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef(); //파일위치저장
  const [result, setResult] = useState(null);
  const { moveToMomentRead, moveToMomentList } = useMyMove();

  useEffect(() => {
    setFetching(true);
    getOne(mno).then((data) => {
      setMoment(data);
      setFetching(false);
    });
  }, [mno]);

  const handleChangeMoment = (e) => {
    moment[e.target.name] = e.target.value;
    setMoment({ ...moment });
  };

  const deleteOldImages = (imageName) => {
    const resultFileNames = moment.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    moment.uploadFileNames = resultFileNames;
    setMoment({ ...moment });
  };

  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other data
    formData.append("mtitle", moment.mtitle);
    formData.append("mcontent", moment.mcontent);
    formData.append("mlocation", moment.mlocationㄴ);
    formData.append("mdate", moment.mdate);
    for (let i = 0; i < moment.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", moment.uploadFileNames[i]);
    }
    setFetching(true);

    //수정 처리
    putOne(mno, formData).then((data) => {
      setResult("Modified");
      setFetching(false);
    });
  };

  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(mno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };
  const closeModal = () => {
    if (result === "Modified") {
      moveToMomentRead(mno); // 조회 화면으로 이동
    } else if (result === "Deleted") {
      moveToMomentList({ page: 1 });
    }
    setResult(null);
  };

  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <InfoModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>mtitle</Form.Label>
          <Form.Control
            name="mtitle"
            value={moment.mtitle}
            type="text"
            placeholder="Enter mtitle"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mcontent</Form.Label>
          <Form.Control
            name="mcontent"
            type="textarea"
            value={moment.mcontent}
            placeholder="Enter mcontent"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>mlocation</Form.Label>
          <Form.Control
            name="mlocation"
            defaultValue={moment.mlocation}
            as="text"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DELETE</Form.Label>
          <Button
            variant="danger"
            onClick={() => handleChangeMoment(moment.mno)}
          >
            삭제
          </Button>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DATE</Form.Label>
          <Form.Control
            name="mdate"
            value={moment.mdate}
            type="date"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple="true" />
        </Form.Group>
      </Form>
      <Row className="d-flex justify-content-center mt-5 gap-4">
        {moment.uploadFileNames.map((imgFile, i) => (
          <>
            <Card style={{ width: "14rem", height: "14rem" }} key={i}>
              <Button
                variant="primary"
                onClick={() => deleteOldImages(imgFile)}
              >
                DELETE
              </Button>
              <Card.Body>
                <img
                  alt="img"
                  style={{ width: "10rem" }}
                  src={`${prefix}/api/moments/view/s_${imgFile} `}
                />
              </Card.Body>
            </Card>
          </>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickDelete}
        >
          DELETE
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleClickModify}
        >
          MODIFY
        </button>
        <button
          className="btn btn-primary"
          type="text"
          onClick={moveToMomentList}
        >
          LIST
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
