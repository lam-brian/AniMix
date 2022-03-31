import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    errorStatus: {
      status: false,
      message: "",
    },
  },
  reducers: {
    setErrorStatus(state, action) {
      state.errorStatus = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
