import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ModifyComponent from "./../../component/todo/ModifyComponent";
import Header from "./../../include/Header";

const ModifyPage = () => {
  const { tno } = useParams();
  return (
    <Container>
      <Header />
      <ModifyComponent tno={tno} />
    </Container>
  );
};

export default ModifyPage;
