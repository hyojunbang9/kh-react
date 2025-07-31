import { useEffect, useState } from "react";
import { getList } from "../../api/momentApi";
import { Container, Row, Card } from "react-bootstrap";
import useMyMove from "../../hooks/useMyMove";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/diaryApi";
import PageComponent from "../common/PageComponent";

const host = API_SERVER_HOST;

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totoalCount: 0,
  prevPage: 0,
  nextPage: 0,
  totalPage: 0,
  current: 0,
};

const ListComponent = () => {
  const { page, size, moveToMomentList, moveToMomentRead, refresh } =
    useMyMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size }).then((data) => {
      console.log(data);
      setServerData(data);
      setFetching(false);
    });
  }, [page, size, refresh]);

  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="display-content-around mt-5 gap-4">
          {serverData.dtoList.map((moment) => (
            <>
              <Card
                className="p-3"
                style={{ width: "14rem", height: "20rem" }}
                key={moment.mno}
                onClick={() => moveToMomentRead(moment.mno)}
              >
                <Card.Body>
                  <Card.Title>일기 번호 :{moment.mno}</Card.Title>
                  <Card.Title>제목 : {moment.mtitle}</Card.Title>
                  <Card.Title>내용 : {moment.mcontent}</Card.Title>
                  <Card.Title>위치 : {moment.mlocation}</Card.Title>
                  <Card.Title>{moment.mdate}</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
                <img
                  alt="moment"
                  src={`${host}/api/moment/view/s_${moment.uploadFileNames[0]} `}
                />
              </Card>
            </>
          ))}
        </Row>
        <PageComponent
          serverData={serverData}
          moveToList={moveToMomentList}
        ></PageComponent>
      </Container>
    </>
  );
};
export default ListComponent;
