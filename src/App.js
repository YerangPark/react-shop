import './App.css';
import { useState, useEffect } from 'react';
// Bootstrap
import { Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let [page, setPage] = useState(1);
  let [moreBtn, setMoreBtn] = useState(true);
  let [loadMsg, setLoadMsg] = useState(false);
  let navigate = useNavigate();

  useEffect(()=>{
    if (page >= 3) {
      setMoreBtn(false);
    }
  }, [page])

  function addShoes(list) {
    let tempShoes = [...shoes, ...list];
    console.log(`tempShoes : ${tempShoes}`);
    setShoes(tempShoes);
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
            <Row> {shoes.map((data)=>{return (<Card data={ data }/>)})} </Row>

            { (loadMsg === true) ? <h3>로딩중입니다.</h3> : null }
            {
              moreBtn === true
              ? <button onClick={()=>{
                  setLoadMsg(true);
                  // AJAX - 외부 라이브러리 사용
                  // console.log(`page : ${page}`);
                  axios.get('https://codingapple1.github.io/shop/data' + (page + 1) + '.json')
                  .then((result)=>{
                    setPage(page + 1);
                    addShoes(result.data);
                    setLoadMsg(false);
                  })
                  .catch(()=>{
                    console.log("ajax 요청 실패함");
                    setLoadMsg(false);
                  })
                }}>더보기</button>
              : null
            }
          </>
        }/>
        <Route path="/detail/:id" element={ <Detail data={ shoes }/> }/>
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
