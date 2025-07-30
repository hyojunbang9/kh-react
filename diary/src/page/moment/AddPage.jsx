import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import AddComponent from "../../component/moment/AddComponent";

export default function AddPage() {
  return (
    <Container>
      <Header />
      <AddComponent />
    </Container>
  );
}
