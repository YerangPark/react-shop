import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { increaseAge } from './../store/userSlice.js'
import { countUp, countDown, removeCart } from './../store.js';

function Cart() {

    let state = useSelector((state)=> state )
    let dispatch = useDispatch(); // store.js로 요청을 보내주는 함수

    return (
      <div>
        {state.user.name}({state.user.age})의 장바구니
        {/* <button onClick={()=>{
            dispatch(increaseAge(100))
        }}>+</button> */}
      <Table>
        <thead>
          <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map((d, index)=> (
               <tr key={index}>
                  <td>{d.id}</td>
                  <td>{d.name}</td>
                  <td>{d.count}</td>
                  <td>
                    <button onClick={()=>{
                        dispatch(countUp(d.id))
                    }}>+</button>
                    <button onClick={()=>{
                        dispatch(countDown(d.id))
                    }}>-</button>
                    <button onClick={()=>{
                        dispatch(removeCart(d.id))
                    }}>X</button>
                  </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      </div>
    );
}

export default Cart;