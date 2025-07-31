import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../component/todo/ReadComponent";
import useMyMove from "../../hooks/useMyMove";

const ReadPage = () => {
  const { tno } = useParams();
  const { moveToList, moveToModify } = useMyMove();

  return (
    <Container>
      <Header />
      <ReadComponent
        tno={tno}
        moveToList={moveToList}
        moveToModify={moveToModify}
      />
    </Container>
  );
};

export default ReadPage;
