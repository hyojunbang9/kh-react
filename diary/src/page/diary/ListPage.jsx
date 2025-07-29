import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useSearchParams } from "react-router-dom";
import ListComponent from "../../component/diary/ListComponent";

const ListPage = () => {
  const [queryParams] = useSearchParams();

  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;
  return (
    <Container>
      <Header />
      <div className="d-grid gap-2 mt-5">
        <ListComponent />
      </div>
    </Container>
  );
};

export default ListPage;
