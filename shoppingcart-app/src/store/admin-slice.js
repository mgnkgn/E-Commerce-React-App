import { createSlice } from "@reduxjs/toolkit";

const initialAdminState = { adminLoggedIn: false };

const adminSlice = createSlice({
  name: "adminControl",
  initialState: initialAdminState,
  reducers: {
    login(state) {
      state.adminLoggedIn = true;
    },
    logout(state) {
      state.adminLoggedIn = false;
    },
  },
});

export const adminActions = adminSlice.actions;
export default adminSlice.reducer;
