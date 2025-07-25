import { Container } from "react-bootstrap";
import Header from "../include/Header";
import useCustomLogin from "../hooks/useCustomLogin";

const AboutPage = () => {
  const { isLogin, moveToLoginReturn } = useCustomLogin();
  if (!isLogin) {
    alert("로그인을 해야만 볼수있는 페이집니다");
    return moveToLoginReturn();
  }
  return (
    <Container>
      <Header />
      <div className="d-grid mt-3">
        <button className="btn btn-outline-primary" type="button">
          About page
        </button>
      </div>
    </Container>
  );
};
export default AboutPage;
