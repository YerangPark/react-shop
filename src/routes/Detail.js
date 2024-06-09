import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from 'react-bootstrap/Nav';
// import styled from 'styled-components';

function Detail(props) {

  let {id} = useParams();
  let keyIdx = props.data.findIndex(obj => obj.id === parseInt(id));
  // let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [amount, setAmount] = useState(0);

  let [message, setMessage] = useState(false);

  // for tabs
  let [tab, setTab] = useState(0); // 0 : 0번 탭 표시

  useEffect(()=>{
    let timer = setTimeout(()=>{ setAlert(false); }, 2000);
    return ()=>{
      clearTimeout(timer);
    }
  }, [])

  useEffect(()=>{
    setMessage(!checkValidNumber(amount));
  }, [amount])

  function checkValidNumber(val) {
      if (!isNaN(val) || !val) return true;
      return false;
    }

  return (
    <>
      {
        (keyIdx == -1) ? <div>없는 상품입니다.</div>
        :<div className="container">
          {
            alert == true
            ? <div className="alert alert-warning">
                2초 이내 구매시 할인!
              </div>
            : null
          }
          {/* { count }
          <button onClick={()=>{setCount(count+1)}}>버튼</button> */}
          <div className="row">
            <div className="col-md-6">
              <img src={ props.data[keyIdx].image } width="300px" />
            </div>
            <div className="col-md-6">
              <h4 className="pt-5">{ props.data[keyIdx].title }</h4>
              <p>{ props.data[keyIdx].content  }</p>
              <p>{ props.data[keyIdx].price }원</p>
              <div>
                개수 : <input type="text" onChange={(e)=>{ setAmount(e.target.value) }}/>
                {
                  message == true
                  ? <div className="alert alert-warning">
                      숫자만 입력해주세요.
                    </div>
                  : null
                }
              </div>
              <button className="btn btn-danger">주문하기</button>
            </div>
        </div>

        <Nav justify variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>상세정보</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>리뷰</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>반품/교환정보</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>
        </div>
      }
    </>
  )
}

function TabContent({tab}) {
  let contents = [<div>상세정보 내용</div>, <div>리뷰 내용</div>, <div>반품/교환정보 내용</div>];
  return contents[tab];
}

export default Detail;