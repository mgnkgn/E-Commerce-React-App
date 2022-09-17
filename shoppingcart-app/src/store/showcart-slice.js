import { createSlice } from "@reduxjs/toolkit";

const showCartInitialState = {
  isCartShown: false,
};

const showCartSlice = createSlice({
  name: "showCart",
  initialState: showCartInitialState,
  reducers: {
    makeCartShow(state) {
      state.isCartShown = true;
    },
    makeCartInvisible(state) {
      state.isCartShown = false;
    },
  },
});
export const showCartActions = showCartSlice.actions;

export default showCartSlice.reducer;
