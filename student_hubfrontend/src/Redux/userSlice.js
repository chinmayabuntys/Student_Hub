import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  age: "",
  role: "",
  token: localStorage.getItem("token") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    updateUsers: (state, action) => {
      return { ...state, ...action.payload };
    },

    clearUser: () => {
      return {
        name: "",
        email: "",
        age: "",
        role: "",
        token: null
      };
    }

  },
});

export const { updateUsers, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
