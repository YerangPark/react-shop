import {Table} from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Cart() {

    let data = useSelector((state)=> state.data )
    console.log(data);

    return (
      <div>
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
            data.map((d, index)=> (
               <tr>
                  <td>{index + 1}</td>
                  <td>{d.name}</td>
                  <td>{d.count}</td>
                  <td>Button</td>
              </tr>
            ))
          }
          {/* <tr>
          <td>1</td>
          <td>{data[0].name}</td>
          <td>{data[0].count}</td>
          <td>Button</td>
          </tr>
          <tr>
          <td>2</td>
          <td>{data[1].name}</td>
          <td>{data[1].count}</td>
          <td>Button</td>
          </tr> */}
        </tbody>
      </Table>
      </div>
    );
}

export default Cart;