import { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { postAdd } from "../../api/ProductApi";
import FetchingModal from "../common/FetchingModal";
import InfoModal from "../common/InfoModal";
import useCustomMove from "../../hooks/useCustomMove";

const initState = { pname: "", pdesc: "", price: 0, files: [] };

const AddComponent = () => {
  const [product, setProduct] = useState({ ...initState });

  const uploadRef = useRef(); //type = "file" 위치 {current:}

  // fetching 모달을 결정을 하는 state true이면 fetching 모달이 보이고, false이면 fetching 모달이 사라진다.
  const [fetching, setFetching] = useState(false);
  // InfoModal 보여줄지 안보여줄지 결정상태.
  const [result, setResult] = useState(null);

  const { moveToProductList } = useCustomMove();

  const handleChangeProduct = (e) => {
    product[e.target.name] = e.target.value;
    setProduct({ ...product });
  };

  //전송버튼을 눌렀을 때 data Api server 전송(insert)
  const handleClickAdd = (e) => {
    // 파일의 정보 [file1, file2]
    const files = uploadRef.current.files;
    //<form method = "post" action = "전송할 주소"> form안에서 보내질 키값 = value </form>
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    //other data
    formData.append("pname", product.pname);
    formData.append("pdesc", product.pdesc);
    formData.append("price", product.price);
    console.log(formData);
    setFetching(true); // 페칭 모달 보이는 것
    postAdd(formData).then((data) => {
      setFetching(false);
      console.log(data);
      setResult(data.result);
    });
  };

  //모달창을 close
  const closeModal = () => {
    setResult(null);
    moveToProductList({ page: 1 }); //모달 창이 닫히면 이동
  };
  return (
    <>
      <Container className="p-5">
        {fetching ? <FetchingModal /> : <></>}
        {/* show = true : 버튼을 클릭해서 모달을 보여주는 것과 같다. */}
        {result ? (
          <InfoModal
            show={true}
            title={`PRODUCT ADD RESULT`}
            content={`${result}번 등록 완료`}
            callbackFn={closeModal}
          />
        ) : (
          <></>
        )}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              name="pname"
              type="text"
              value={product.pname}
              onChange={handleChangeProduct}
              placeholder="Enter pname"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              name="pdesc"
              value={product.pdesc}
              as="textarea"
              rows={4}
              onChange={handleChangeProduct}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              type="number"
              value={product.price}
              onChange={handleChangeProduct}
              placeholder="Enter price"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Files</Form.Label>
            <Form.Control ref={uploadRef} type="file" multiple="true" />
          </Form.Group>
        </Form>
        <div className="d-flex justify-content-center gap-2 ">
          <Button variant="primary" type="button" onClick={handleClickAdd}>
            저장
          </Button>
        </div>
      </Container>
    </>
  );
};
export default AddComponent;
