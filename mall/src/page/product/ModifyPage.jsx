import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ModifyComponent from "./../../component/product/ModifyComponent";
import Header from "./../../include/Header";

const ModifyPage = () => {
  const { pno } = useParams();
  return (
    <Container>
      <Header />
      <ModifyComponent pno={pno} />
    </Container>
  );
};

export default ModifyPage;
