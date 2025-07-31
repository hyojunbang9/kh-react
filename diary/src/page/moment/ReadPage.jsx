import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ReadComponent from "../../component/moment/ReadComponent";
import useMyMove from "../../hooks/useMyMove";

export default function ReadPage() {
  const { mno } = useParams();
  const { moveToMomentList, moveToMomentModify } = useMyMove();
  return (
    <Container>
      <Header />
      <ReadComponent
        mno={mno}
        moveToList={moveToMomentList}
        moveToModify={moveToMomentModify}
      />
    </Container>
  );
}
