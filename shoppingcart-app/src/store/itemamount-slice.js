import { createSlice } from "@reduxjs/toolkit";

const initialItemAmountState = {
  totalItems: 0,
};

const itemAmountSlice = createSlice({
  name: "itemAmount",
  initialState: initialItemAmountState,
  reducers: {
    addItem(state) {
      state.totalItems += 1;
    },
    discardItem(state) {
      if (!(state.totalItems > 0)) {
        return state.totalItems;
      }
      state.totalItems -= 1;
    },
  },
});
export const itemAmountActions = itemAmountSlice.actions;
export default itemAmountSlice.reducer;
