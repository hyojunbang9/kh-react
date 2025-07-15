import { Container } from "react-bootstrap";
import Header from "../include/Header";
const AboutPage = () => {
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
