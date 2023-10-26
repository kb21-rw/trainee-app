import { createSlice } from "@reduxjs/toolkit";

export interface UserState {}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
