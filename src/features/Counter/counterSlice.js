// thay vi action va reducer phai tao rieng thi` dung` createSlice dung` chung action va reducer

import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment(state) {
      // return state + 1;
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
});

export const { increment, decrement} = counterSlice.actions;
export default counterSlice.reducer;

// neu state la` 1 object hay array thi` khong dung` return o reducers duoc, neu no chi la` string, boolean, number thi` phat dung return, neu khong se bi undefined
// Khong return thi` clone array do library immer chiu trach nhiem, neu co return thi` clone array,object do minh` tu chiu trach nhiem.
// default export : reducer,
// name export : action creator

// doc createAsyncThunk, createSelector, extraReducers

// project
// gio hang` dung` redux
// dung` 1 state luu thong tin gio hang o localStorage

// Neu lam gio hang` ma lien quan den thuat toan tinh toan thi` nho` ben backend xu ly roi` minh` goi Api thoi, rat de dinh loi~
