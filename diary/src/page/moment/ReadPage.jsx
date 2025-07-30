import React from "react";
import { useCallback } from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ReadComponent from "../../component/moment/ReadComponent";

export default function ReadPage() {
  const { mno } = useParams();
  return (
    <Container>
      <Header />
      <ReadComponent mno={mno} />
    </Container>
  );
}
