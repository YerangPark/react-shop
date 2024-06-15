import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey High Top', count : 1}
      ],
    reducers : {
      countUp(state, action) {
        const id = action.payload;
        const idx = state.findIndex((obj) => obj.id === id);
        state[idx].count++;
      },
      countDown(state, action) {
        const id = action.payload;
        const idx = state.findIndex((obj) => obj.id === id);
        state[idx].count--;
      },
      addCart(state, action) {
        const newItem = action.payload
        const idx = state.findIndex((obj) => obj.id === newItem.id);
        if (idx !== -1) {
          console.log("장바구니에 이미 있습니다.");
          return;
        }
        state.push({
          id: newItem.id,
          name: newItem.title,
          count : 1
        });
      },
      removeCart(state, action) {
        const id = action.payload;
        const idx = state.findIndex((obj) => obj.id === id);
        if (idx === -1) {
          console.log("존재하지 않는 항목입니다.");
          return;
        }
        state.splice(idx, 1);
      }
    }
})
export let { countUp, countDown, addCart, removeCart } = cart.actions

export default configureStore({
  reducer: {
    user : user.reducer,
    cart : cart.reducer
  }
})
