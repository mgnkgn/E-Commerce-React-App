import { createSlice } from "@reduxjs/toolkit";

const initialCheckOutState = {
  isCheckoutShown: false,
};

const showCheckout = createSlice({
  name: "showCheckout",
  initialState: initialCheckOutState,
  reducers: {
    makeCheckoutShow(state) {
      state.isCheckoutShown = true;
    },
    makeCheckoutInvisible(state) {
      state.isCheckoutShown = false;
    },
  },
});
export const showCheckoutActions = showCheckout.actions;

export default showCheckout.reducer;
