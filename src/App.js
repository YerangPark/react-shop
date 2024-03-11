import logo from './logo.svg';
import './App.css';
// Bootstrap
import { Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Jelly Rang</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <br/>

      <Row>
        <Col>
          <img height="500px" src="https://images.unsplash.com/photo-1605125207267-f27feb22899d?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
        </Col>
        <Col>
          <img height="500px" src="https://images.unsplash.com/photo-1605188229517-5336af291329?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
        </Col>
        <Col>
          <img height="500px" src="https://images.unsplash.com/photo-1605125207921-7252c90ffc79?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
          <h4>상품명</h4>
          <p>상품 설명</p>
        </Col>
      </Row>

    </div>
  );
}

export default App;
