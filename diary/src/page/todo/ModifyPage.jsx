import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../component/todo/ModifyComponent";
import useMyMove from "../../hooks/useMyMove";

const ModifyPage = () => {
  const { tno } = useParams();
  const { moveToList, moveRead } = useMyMove();

  return (
    <Container>
      <Header />
      <ModifyComponent tno={tno} moveToList={moveToList} moveRead={moveRead} />
    </Container>
  );
};
export default ModifyPage;
