import './App.css';
import { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
// Bootstrap
import { Container, Nav, Navbar, Row, Col, Card} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
import data from './data.js';
const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function App() {
  useEffect(()=>{
    if (!localStorage.getItem('watched')) localStorage.setItem('watched', JSON.stringify([]));
  }, [])

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

  let result = useQuery(['작명'], ()=>
      axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨');
      return a.data
    }),
    { staleTime : 2000 } // refetch되는 간격을 설정 (2초 안에는 refetch 되지 않음)
  )

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
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            반가워요 
            { result.isLoading && '로딩중' }
            { result.error && '에러남' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
          <>
            <LatestViewItem data={ data }/>
            <div className="main-bg"></div>
            <br/>
            <Row> {shoes.map((data, i)=>{return (<CardItem data={ data } key={i}/>)})} </Row>

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
        <Route path="/detail/:id" element={ <Suspense fallback={<SpinnerComp/>}><Detail data={ shoes }/></Suspense> }/>
        <Route path="/cart" element={<Suspense fallback={<SpinnerComp/>}><Cart/></Suspense>} />
        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버 소개 작성란</div>}/>
          <Route path="location" element={<div>오시는 길 작성찬</div>}/>
        </Route>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 마이구미 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>}/>
        </Route>
        <Route path="*" element={<div>Invalid Access.</div>}/>
      </Routes>
    </div>
  );
  function About() {
    return (
      <div>
        <br/>
        <h2>Shoes Rang에 대하여</h2>
        <br/>
        <img src="https://via.placeholder.com/500x300" alt="Placeholder Image 1" width="500" height="300"/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis sem nec justo ultricies volutpat. Vivamus convallis est at metus ultricies fermentum. Aliquam nec erat sed nisl venenatis pretium. Donec a libero nec elit molestie interdum. Nunc id ipsum semper, interdum lectus non, vehicula sem. Etiam laoreet nunc vel purus mollis, id semper risus aliquet. Duis dapibus mauris eu erat sollicitudin, sit amet vestibulum lorem placerat. Proin tristique est nec augue eleifend aliquet. Mauris vitae magna non ex accumsan auctor. Ut eget tristique felis. Cras at ullamcorper magna. Ut ut odio non lorem rhoncus rutrum. Nullam auctor scelerisque neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          Maecenas non orci efficitur, consectetur tortor ac, finibus quam. Integer ultrices sapien ac dui sollicitudin lobortis. Nulla consectetur lectus vitae nisi tincidunt, a eleifend eros feugiat. Vestibulum congue augue nec tortor dignissim faucibus. Nulla vehicula enim a felis consectetur, at aliquet orci pulvinar. Duis maximus sem id mi consequat, et tristique urna congue. Curabitur suscipit felis non felis condimentum, in gravida sapien efficitur. Suspendisse potenti. Vivamus at nibh sed urna bibendum malesuada. Curabitur consequat justo ac libero sollicitudin, et maximus lorem eleifend. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas eu erat in risus convallis hendrerit.
          Phasellus convallis velit vel odio ultricies, a blandit quam tempus. Suspendisse potenti. Ut sit amet ante id justo fermentum laoreet nec vel risus. Vestibulum tempus, turpis quis consequat fermentum, purus tellus tempus risus, ac aliquam libero diam sed tortor. Aliquam et nibh dapibus, varius lorem id, mattis sapien. Nam consequat lacus sit amet tristique fermentum. Proin hendrerit bibendum mi, a commodo justo interdum ac. Nulla quis semper tortor. Nam interdum, eros non tempor pretium, neque nisi feugiat lectus, eget venenatis nisi risus quis turpis. In hac habitasse platea dictumst. Etiam eleifend ultrices vehicula. Proin at eros ac enim vestibulum dictum nec ac dui. Curabitur fringilla ligula vel ligula molestie rutrum.
        </p>

        <img src="https://via.placeholder.com/500x300" alt="Placeholder Image 1" width="500" height="300"/>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris et sapien libero. Nam at nulla urna. Morbi eget urna ac elit lacinia rutrum. Ut consequat vehicula ante, ac congue eros. Sed lacinia dui ligula, sed facilisis nisi fermentum id. Cras ac odio ac lectus fermentum vestibulum. Proin dictum risus eget ligula lacinia, quis euismod augue fringilla. Suspendisse eu quam turpis. Nullam scelerisque fermentum tellus. Nullam aliquam purus a purus consequat, in cursus odio vestibulum. Curabitur malesuada ante eget orci eleifend, non dictum libero ultrices. Nulla facilisi. Integer ac accumsan urna.
          In sit amet tortor fringilla, vehicula justo vitae, sagittis nunc. Sed efficitur odio sit amet orci volutpat tempus. Curabitur congue, nunc in aliquam convallis, velit turpis fringilla orci, sit amet lacinia augue erat sit amet ipsum. Nulla facilisi. Nullam pharetra, nisl eu posuere luctus, neque enim tristique risus, id vestibulum libero sem vitae sapien. Duis suscipit justo nec dapibus dignissim. Phasellus ac purus ac magna scelerisque tincidunt. Sed dapibus a odio eu dapibus. Nulla facilisi. Integer lacinia, sapien nec viverra scelerisque, mi mi lacinia nunc, sit amet elementum lacus nisl ut enim. Morbi non efficitur nulla.
          Vestibulum non libero nec elit suscipit venenatis. Proin et tellus in nisi ullamcorper luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut et felis at mauris placerat laoreet. Donec ac nulla nec velit faucibus efficitur. Integer sed enim vel purus aliquam tincidunt. Ut et metus ac quam malesuada tempus. Integer mattis condimentum leo, vel auctor justo posuere sed. Duis eu mi libero. Mauris quis efficitur ante. Cras sit amet leo justo. Vivamus blandit eu nulla a vehicula. Aenean tempor luctus purus vel euismod.
        </p>
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

function CardItem(props) {
  let navigate = useNavigate();
  return (
    <Col>
      {/* <img height="300px" src={ props.data.image }/> */}
      <img height="300px" src={"https://codingapple1.github.io/shop/shoes" + (props.data.id + 1) + ".jpg"}
      alt="" onClick={()=>{navigate('/detail/' + props.data.id)}}/>
      <h4>{ props.data.title }</h4>
      <p>{ props.data.price }</p>
    </Col>
  )
}

function LatestViewItem(props) {
  let navigate = useNavigate();
  let watched = JSON.parse(localStorage.getItem('watched'));
  return (
    <>
    {(watched && watched.length) ?
      <Card style={{ width: '8rem' }} className='fixed-banner'>
        <ListGroup variant="flush">
        <ListGroup.Item>최근 본 항목</ListGroup.Item>
        {watched.map((idx)=>{return (<ListGroup.Item key={idx}>
          <img height="60px" src={props.data[idx].image} alt="" onClick={()=>{navigate('/detail/' + props.data[idx].id)}}/>
          </ListGroup.Item>)})}
        </ListGroup>
      </Card>
    : null}
    </>
  );
}

function SpinnerComp() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default App;
