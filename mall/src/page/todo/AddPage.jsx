import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../component/todo/AddComponent";

const AddPage = () => {
  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        <AddComponent />
      </div>
    </Container>
  );
};
export default AddPage;
