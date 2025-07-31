import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar
      collapseOnSelect
      bg="primary"
      data-bs-theme="dark"
      className="bg-body-primary"
    >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">MAIN</Nav.Link> <br />
            <NavDropdown title="DIARY" className="bg-body-primary" bg="primary">
              <NavDropdown.Item href="/diary/list">LIST</NavDropdown.Item>
              <NavDropdown.Item href="/diary/add">ADD</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="MOMENT"
              className="bg-body-primary"
              bg="primary"
            >
              <NavDropdown.Item href="/moment/list">LIST</NavDropdown.Item>
              <NavDropdown.Item href="/moment/add">ADD</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TODO" className="bg-body-primary" bg="primary">
              <NavDropdown.Item href="/todo/list">LIST</NavDropdown.Item>
              <NavDropdown.Item href="/todo/add">ADD</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Link to={"/member/login"}>Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
