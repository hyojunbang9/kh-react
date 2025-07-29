import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../component/diary/ModifyComponent";
import useCustomMove from "../../hooks/useCustomMove";

const ModifyPage = () => {
  const { dno } = useParams();
  const { moveToList, moveRead } = useMyMove();

  return (
    <Container>
      <Header />
      <ModifyComponent dno={dno} moveToList={moveToList} moveRead={moveRead} />
    </Container>
  );
};
export default ModifyPage;
