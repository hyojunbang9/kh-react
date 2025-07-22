import { useState, useEffect } from "react";
import { getList } from "../../api/ProductApi";
import useCustomMove from "../../hooks/useCustomMove";
import { Container, Card, Row } from "react-bootstrap";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/todoApi";
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
  const { page, size, moveToProductList, moveToProductRead, refresh } =
    useCustomMove();
  const [serverData, setServerData] = useState(initState);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    getList({ page, size })
      .then((data) => {
        setServerData(data);
        setFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, size, refresh]);

  return (
    <>
      <Container className="px-5 justify-content-center mb-5">
        {fetching ? <FetchingModal /> : <></>}
        <Row className="display-content-around mt-5 gap-4">
          {serverData.dtoList.map((product) => (
            <>
              <Card
                className="p-3"
                style={{ width: "14rem", height: "20rem", cursor: "pointer" }}
                key={product.pno}
                onClick={() => moveToProductRead(product.pno)}
              >
                <Card.Body>
                  <Card.Title>PNO :{product.pno}</Card.Title>
                  <Card.Title>NAME : {product.pname}</Card.Title>
                  <Card.Title>PRICE : {product.price}원</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
                <img
                  alt="product"
                  style={{ width: "10rem", height: "10rem" }}
                  src={`${host}/api/products/view/s_${product.uploadFileNames[0]} `}
                />
              </Card>
            </>
          ))}
        </Row>
        <PageComponent
          serverData={serverData}
          moveToList={moveToProductList}
        ></PageComponent>
      </Container>
    </>
  );
};

export default ListComponent;
