import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useParams } from "react-router-dom";
import ModifyComponent from "../../component/moment/ModifyComponent";

export default function ModifyPage() {
  const { mno } = useParams();
  return (
    <Container>
      <Header />
      <ModifyComponent mno={mno} />
    </Container>
  );
}
