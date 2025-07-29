import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import ReadComponent from "../../component/diary/ReadComponent";
import useCustomMove from "../../hooks/useMyMove";

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
