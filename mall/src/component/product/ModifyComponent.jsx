import { useEffect, useState, useRef } from "react";
import { Container, Card, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { deleteOne, getOne, putOne } from "../../api/ProductApi";
import FetchingModal from "../common/FetchingModal";
import { API_SERVER_HOST } from "../../api/ProductApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/InfoModal";
const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  delFlag: false,
  uploadFileNames: [],
};

const ModifyComponent = ({ pno }) => {
  const host = API_SERVER_HOST;
  const [product, setProduct] = useState(initState);
  const [fetching, setFetching] = useState(false);
  const uploadRef = useRef();
  //결과 모달
  const [result, setResult] = useState(null);
  //이동용 함수
  const { moveToProductRead, moveToProductList } = useCustomMove();
  useEffect(() => {
    setFetching(true);
    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);
  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };
  const deleteOldImages = (imageName) => {
    const resultFileNames = product.uploadFileNames.filter(
      (fileName) => fileName !== imageName
    );
    product.uploadFileNames = resultFileNames;
    setProduct({ ...product });
  };
  const handleClickModify = () => {
    const files = uploadRef.current.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    //other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    formData.append("delFlag", product.delFlag);
    for (let i = 0; i < product.uploadFileNames.length; i++) {
      formData.append("uploadFileNames", product.uploadFileNames[i]);
    }
    //fetching setFetching(true)
    putOne(pno, formData).then((data) => {
      //수정 처리
      setResult("Modified");
      setFetching(false);
    });
  };
  const handleClickDelete = () => {
    setFetching(true);
    deleteOne(pno).then((data) => {
      setResult("Deleted");
      setFetching(false);
    });
  };
  const closeModal = () => {
    if (result === "Modified") {
      moveToProductRead(pno); // 조회 화면으로 이동
    } else if (result === "Deleted") {
      moveToProductList({ page: 1 });
    }
    setResult(null);
  };
  return (
    <Container className="p-5">
      {fetching ? <FetchingModal /> : <></>}
      {result ? (
        <ResultModal
          title={`${result}`}
          content={"정상적으로 처리되었습니다."} //결과 모달창
          callbackFn={closeModal}
        />
      ) : (
        <></>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>PNAME</Form.Label>
          <Form.Control
            name="pname"
            defaultValue={product.pname}
            type="text"
            placeholder="Enter name"
            onChange={handleChangeProduct}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PRICE</Form.Label>
          <Form.Control
            name="price"
            type="number"
            value={product.price}
            placeholder="Enter price"
            onChange={handleChangeProduct}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DESCRIPTION</Form.Label>
          <Form.Control
            name="pdesc"
            defaultValue={product.pdesc}
            as="textarea"
            rows={5}
            onChange={handleChangeProduct}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>DELETE</Form.Label>
          <Form.Select
            name="delFlag"
            defaultValue={product.delFlag ? "사용" : "삭제"}
            onChange={handleChangeProduct}
          >
            <option value={false}>사용</option>
            <option value={true}>삭제</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Files</Form.Label>
          <Form.Control ref={uploadRef} type="file" multiple="true" />
        </Form.Group>
      </Form>
      <Row className="d-flex justify-content-center mt-5 gap-4">
        {product.uploadFileNames.map((imgFile, i) => (
          <>
            <Card style={{ width: "14rem", height: "14rem" }} key={i}>
              <Button
                variant="primary"
                onClick={() => deleteOldImages(imgFile)}
              >
                DELETE
              </Button>
              <Card.Body>
                <img
                  alt="img"
                  style={{ width: "10rem" }}
                  src={`${host}/api/products/view/s_${imgFile} `}
                />
              </Card.Body>
            </Card>
          </>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-5">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleClickDelete}
        >
          DELETE
        </button>
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleClickModify}
        >
          MODIFY
        </button>
        <button
          className="btn btn-primary"
          type="text"
          onClick={moveToProductList}
        >
          LIST
        </button>
      </div>
    </Container>
  );
};
export default ModifyComponent;
