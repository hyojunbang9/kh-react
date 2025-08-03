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
          <Form.Label>제목</Form.Label>
          <Form.Control
            name="dtitle"
            type="text"
            value={diary.dtitle}
            onChange={handleChangediary}
            placeholder="오늘을 한 줄로 요약하면?   ex) '꼭 기억하고 싶은 하루'"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>글쓴이</Form.Label>
          <Form.Control
            name="dwriter"
            type="text"
            value={diary.dwriter}
            onChange={handleChangediary}
            placeholder="오늘 당신은 어떤 사람이었나요? ex) '세상을 가진 사람'"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>내용</Form.Label>
          <Form.Control
            name="dcontent"
            type="text"
            value={diary.dcontent}
            onChange={handleChangediary}
            placeholder="당신의 오늘 하루는 어땠나요?"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>날씨</Form.Label>
          <Form.Control
            name="dweather"
            type="text"
            value={diary.dweather}
            onChange={handleChangediary}
            placeholder="오늘의 날씨! 기분을 담은 날씨도 좋아요. ex) '🌩️우중충한 날씨조차 내 행복을 막지 못한 날☀️'"
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Form.Label>날짜</Form.Label>
          <Form.Control
            name="ddate"
            type="date"
            value={diary.ddate}
            onChange={handleChangediary}
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
