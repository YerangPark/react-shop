import './App.css';
import { useState } from 'react';
// Bootstrap
import { Button, Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  let [jellys, setJellys] = useState(data);
  let [page, setPage] = useState(1);
  let navigate = useNavigate();

  function addJellys(list) {
    let tempJellys = [...jellys, ...list];
    console.log(`tmpJellys : ${tempJellys}`);
    setJellys(tempJellys);
  }

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand onClick={()=>{ navigate('/') }}>Shoes Rang</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/about') }}>About</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/event') }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg"></div>
            <br/>
            <Row> {jellys.map((data)=>{return (<Card data={ data }/>)})} </Row>
          </>
        }/>
        <Route path="/detail/:id" element={ <Detail data={ jellys }/> }/>
        {/* <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}/>
          <Route path="location" element={<div>오시는 길임</div>}/>
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 마이구미 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
        </Route> */}
        <Route path="*" element={<div>Invalid Access.</div>}/>
      </Routes>

      <button onClick={()=>{
          // 외부 라이브러리 사용
          axios.get('https://codingapple1.github.io/shop/data' + (page + 1) + '.json')
          .then((result)=>{
            setPage(page + 1);
            addJellys(result.data);
          })
          .catch(()=>{
            console.log("ajax 요청 실패함");
          })
        }}>더보기</button>

    </div>
  );
  function About() {
    return (
      <div>
        <h4>회사 정보임</h4>
        <Outlet></Outlet>
      </div>
    )
  }
  function Event() {
    return (
      <div>
        <h4>오늘의 이벤트</h4>
        <Outlet></Outlet>
      </div>
    )
  }
}

function Card(props) {
  return (
    <Col>
      {/* <img height="300px" src={ props.data.image }/> */}
      <img height="300px" src={"https://codingapple1.github.io/shop/shoes" + (props.data.id + 1) + ".jpg"}/>
      <h4>{ props.data.title }</h4>
      <p>{ props.data.price }</p>
    </Col>
  )
}

export default App;
