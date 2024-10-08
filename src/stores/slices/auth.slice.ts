import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/AuthTypes";
const user = {
  _id: "1",
  name: "Nguyen Thanh",
  email: "nguyenthanh@gmail.com",
  password: "123456",
  phone: "0123456789",
  address: "489 NVC, P3, GV, TPHCM",
  avatar: "https://i.imgur.com/ylPJBm7.jpeg",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};
export interface UserStates {
  user: UserType;
}

const defaultState: UserStates = {
  user: user,
};

const userSlice = createSlice({
  name: "auth",
  initialState: defaultState,
  reducers: {},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
