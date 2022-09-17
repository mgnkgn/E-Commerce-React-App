import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin-slice";
import itemAmountReducer from "./itemamount-slice";
import cartReducer from "./cart-slice";
import showCartReducer from "./showcart-slice";
import showCheckoutReducer from "./showcheckout-slice";
import productsReducer from "./products-slice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    itemAmount: itemAmountReducer,
    cart: cartReducer,
    showCart: showCartReducer,
    showCheckout: showCheckoutReducer,
    products: productsReducer,
  },
});

export default store;
