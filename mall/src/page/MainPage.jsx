import React from "react";
import { Container } from "react-bootstrap";
import Header from "../include/Header";

const MainPage = () => {
  return (
    <div>
      <Container>
        <Header />
        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-outline-secondary" type="button">
            MainPage
          </button>
        </div>
      </Container>
    </div>
  );
};

export default MainPage;
