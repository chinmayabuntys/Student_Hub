import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  age: "",
  role: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    updateUsers: (state, action) => {
     
        state.name=action.payload.name,
        state.email= action.payload.email,
        state.age= action.payload.age,
        state.role= action.payload.role
    
    },

    clearUser: () => {
      return {
        name: "",
        email: "",
        age: "",
        role: ""
      };
    }

  },
});

export const { updateUsers, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
