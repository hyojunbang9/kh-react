import { useEffect, useState } from "react";
import { getOne } from "../../api/ProductApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import { Container, Form } from "react-bootstrap";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  const { moveToProductList, moveToProductModify } = useCustomMove(); //화면 이동용 함수
  const [fetching, setFetching] = useState(false); //fetching
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PNO</Form.Label>
          <Form.Control
            value={pno}
            type="text"
            placeholder="Enter pno"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            value={product.pname}
            type="text"
            placeholder="Enter name"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            type="text"
            value={product.price + "원"}
            placeholder="Enter price"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            type="text"
            value={product.pdesc}
            placeholder="Enter price"
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3 d-flex justify-content-center">
          {product.uploadFileNames.map((imgFile, i) => (
            <img
              alt="product"
              key={i}
              style={{ width: "14rem", height: "14rem" }}
              src={`${host}/api/products/view/s_${imgFile}`}
            />
          ))}
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => {
            moveToProductModify(pno);
          }}
        >
          수정하기
        </button>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => {
            moveToProductList();
          }}
        >
          리스트보기
        </button>
      </div>
    </Container>
  );
};
export default ReadComponent;
