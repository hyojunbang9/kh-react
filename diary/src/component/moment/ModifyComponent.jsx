import { useEffect, useState, useRef } from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/momentApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/diaryApi";
import useMyMove from "../../hooks/useMyMove";
import InfoModal from "../common/InfoModal";
import "./ModifyComponent.css";

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

  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(mno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
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
    formData.append("mlocation", moment.mlocation);
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

  const closeModal = () => {
    if (result === "Modified") {
      moveToMomentRead(mno); // 조회 화면으로 이동
    } else if (result === "Deleted") {
      moveToMomentList({ page: 1 });
    }
    setResult(null);
  };

  return (
    <Container className="modify-container">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <InfoModal
          show={true}
          title={`${result}`}
          content={"정상적으로 처리되었습니다."}
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <div className="modify-header">MOMENT 수정📸</div>
      <Form className="modify-form">
        <Form.Group className="mb-3">
          <Form.Label>번호</Form.Label>
          <Form.Control value={mno} type="text" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="mtitle"
            value={moment.mtitle}
            type="text"
            placeholder="오늘의 순간을 한 줄로 요약하면?"
            onChange={handleChangeMoment}
          />
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
                      src={`${prefix}/api/moment/view/s_${imgFile} `}
                    />
                  </Card.Body>
                </Card>
              </>
            ))}
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>사진 추가</Form.Label>
            <Form.Control ref={uploadRef} type="file" multiple="true" />
          </Form.Group>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="mcontent"
            as="textarea"
            rows={3}
            value={moment.mcontent}
            placeholder="오늘의 순간은 어땠나요?"
            onChange={handleChangeMoment}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>장소</Form.Label>
          <Form.Control
            name="mlocation"
            value={moment.mlocation}
            type="text"
            placeholder="어디에서 일어난 순간인가요?"
            onChange={handleChangeMoment}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>날짜</Form.Label>
          <Form.Control
            name="mdate"
            value={moment.mdate}
            type="date"
            onChange={handleChangeMoment}
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
          type="button"
          onClick={moveToMomentList}
        >
          목록
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
