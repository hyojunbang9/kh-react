import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ReadComponent from "./../../component/todo/ReadComponent";
import useCustomMove from "../../hooks/useCustomMove";

const ReadPage = () => {
  const { tno } = useParams();
  const { moveToList, moveToModify } = useCustomMove();

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
