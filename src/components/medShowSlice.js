import { createSlice } from "@reduxjs/toolkit";

export const medShowSlide = createSlice({
  name: "medShow",
  initialState: {
    value:{
        isShow: false,
        type: "view",
        medItem: null,
    }
  },
  reducers: {
    show: (state, action) => {
      state.value.isShow = true;
      state.value = {
        ...state.value,
        ...action.payload
      };
    },
    hide: (state) => {
      state.value.isShow = false;
      state.value.medItem = null;
    },
  },
});

export const { show, hide } = medShowSlide.actions;

export const selectMedShow = (state) => state.medShow.value;

export default medShowSlide.reducer;
