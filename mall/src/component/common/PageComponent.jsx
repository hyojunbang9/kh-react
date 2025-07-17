import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const PageComponent = ({ serverData, moveToList }) => {
  return (
    <Container className="d-flex justify-content-center mt-3">
      <Pagination size="md">
        {serverData.prev && (
          <Pagination.Prev
            onClick={() => {
              moveToList({ page: serverData.prevPage });
            }}
          />
        )}

        {serverData.pageNumList.map((pageNum) => (
          <Pagination.Item
            key={pageNum}
            active={serverData.current === pageNum}
            onClick={() => {
              moveToList({ page: pageNum });
            }}
          >
            {pageNum}
          </Pagination.Item>
        ))}

        {serverData.next && (
          <Pagination.Next
            onClick={() => {
              moveToList({ page: serverData.nextPage });
            }}
          />
        )}
      </Pagination>
    </Container>
  );
};

export default PageComponent;
