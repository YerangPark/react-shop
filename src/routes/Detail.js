import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import styled from 'styled-components';

function Detail(props) {

  let {id} = useParams();
  let keyIdx = props.data.findIndex(obj => obj.id === parseInt(id));
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [amount, setAmount] = useState(0);

  let [message, setMessage] = useState(false);

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
          { count }
          <button onClick={()=>{setCount(count+1)}}>버튼</button>
          <div className="row">
            <div className="col-md-6">
              <img src={ props.data[keyIdx].image } width="300px" />
            </div>
            <div className="col-md-6">
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
              <h4 className="pt-5">{ props.data[keyIdx].title }</h4>
              <p>{ props.data[keyIdx].content  }</p>
              <p>{ props.data[keyIdx].price }원</p>
              <button className="btn btn-danger">주문하기</button>
            </div>
        </div>
        </div>
      }
    </>
  )
}

export default Detail;