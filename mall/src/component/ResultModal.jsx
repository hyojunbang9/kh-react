import { Modal, Button } from "react-bootstrap";

const ResultModal = ({ title = "결과", content = "", callbackFn }) => {
  return (
    <Modal show={true} onHide={callbackFn} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center fs-5">{content}</p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button variant="primary" onClick={callbackFn}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
