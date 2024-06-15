import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
  name : 'user',
  initialState : { name : '박예랑', age : 27 },
  reducers : {
      changeName(state) {
      state.name = 'Yerang Park'
      },
      increaseAge(state, action) {
      state.age += action.payload
      }
  }
})
export let { changeName, increaseAge } = user.actions;

export default user;
