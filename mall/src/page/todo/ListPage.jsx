import { Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Header from "./../../include/Header";
import ListComponent from "../../component/todo/ListComponent";

const ListPage = () => {
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 1;

  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        {`Todo List Page components page: ${page} size: ${size}`}
        <ListComponent />
      </div>
    </Container>
  );
};
export default ListPage;
