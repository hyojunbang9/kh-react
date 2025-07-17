import React from "react";
import { Container } from "react-bootstrap";
import Header from "../../include/Header";
import { useCallback, useMemo } from "react";
import {
  useParams,
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import ReadComponent from "./../../component/todo/ReadComponent";

const ReadPage = () => {
  const { tno } = useParams();
  const nav = useNavigate();
  const [queryParams] = useSearchParams();
  const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
  const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  const queryStr = useMemo(() => {
    return createSearchParams({ page, size }).toString();
  }, [page, size]);

  const moveToModify = useCallback(
    (tno) => {
      nav({
        pathname: `/todo/modify/${tno}`,
        search: queryStr,
      });
    },
    [nav, queryStr]
  );
  const moveToList = useCallback(() => {
    nav({ pathname: `/todo/list`, search: queryStr });
  }, [nav, queryStr]);

  return (
    <Container>
      <Header />
      <ReadComponent tno={tno} />
    </Container>
  );
};

export default ReadPage;
