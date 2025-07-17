import { useEffect, useState, useRef } from "react";
import { getOne } from "../../api/todoApi";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const initState = {
  tno: 0,
  title: "",
  writer: "",
  dueDate: null,
  complete: false,
};

const ReadComponent = ({ tno }) => {
  const [todo, setTodo] = useState(initState);

  useEffect(() => {
    getOne(tno).then((data) => {
      setTodo(data);
    });
  }, [tno]);

  return (
    <>
      <Container className="p-5">
        <Form>
          <Form.Group>
            <Form.Label>TNO</Form.Label>
            <Form.Control
              defaultValue={todo.tno}
              type="text"
              placeholder="Enter no"
              disabled
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>WRITER</Form.Label>
            <Form.Control
              defaultValue={todo.writer}
              type="text"
              placeholder="Enter writer"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>TITLE</Form.Label>
            <Form.Control
              type="text"
              defaultValue={todo.title}
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>DATE</Form.Label>
            <Form.Control defaultValue={todo.dueDate} type="text" disabled />
          </Form.Group>

          <Form.Group>
            <Form.Label>COMPLETE</Form.Label>
            <Form.Control
              value={todo.complete ? "Completed" : "Not Yet"}
              type="text"
            />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default ReadComponent;
