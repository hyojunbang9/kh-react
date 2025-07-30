import { useEffect, useState } from "react";
import { getOne } from "../../api/diaryApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const initState = {
  dno: 0,
  dtitle: "",
  dwriter: "",
  dcontent: "",
  dweather: "",
  ddate: null,
};
const ReadComponent = ({ dno, moveToList, moveToModify }) => {
  const [diary, setDiary] = useState(initState);

  useEffect(() => {
    getOne(dno).then((data) => {
      console.log(data);
      setDiary(data);
    });
  }, [dno]);

  return (
    <Container className="p-5">
      <Form>
        <Form.Group>
          <Form.Label>DNO</Form.Label>
          <Form.Control
            value={diary.dno}
            type="text"
            placeholder="Enter no"
            disabled
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>dtitle</Form.Label>
          <Form.Control
            value={diary.dtitle}
            type="text"
            placeholder="Enter dwriter"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>dwriter</Form.Label>
          <Form.Control
            type="text"
            value={diary.dwriter}
            placeholder="Enter dwriter"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>dcontent</Form.Label>
          <Form.Control
            type="text"
            value={diary.dcontent}
            placeholder="Enter dcontent"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>dweather</Form.Label>
          <Form.Control
            type="text"
            value={diary.dweather}
            placeholder="Enter dweather"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ddate</Form.Label>
          <Form.Control value={diary.ddate} type="text" disabled />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToModify(dno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-primary"
          type="button"
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
export default ReadComponent;
