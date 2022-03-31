import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    errorStatus: {
      status: false,
      message: "",
    },
    pagination: {
      page: 1,
      pageOffset: 0,
    },
    clicked: false,
  },
  reducers: {
    setErrorStatus(state, action) {
      state.errorStatus = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    changePage(state, action) {
      if (action.payload === "next") {
        state.pagination.page++;
        state.pagination.pageOffset += 20;
      }
      if (action.payload === "prev") {
        state.pagination.page--;
        state.pagination.pageOffset -= 20;
      }
    },
    resetPage(state) {
      state.pagination.page = 1;
      state.pagination.pageOffset = 0;
    },
    setClicked(state, action) {
      state.clicked = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
