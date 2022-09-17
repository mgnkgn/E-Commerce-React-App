import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartProductTotalQuantity: 0,
  cartProductTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addToCart(state, action) {
      const ifExistsIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (ifExistsIndex >= 0) {
        state.cartItems[ifExistsIndex].itemQuantity += 1;
      } else {
        const incomingProduct = { ...action.payload, itemQuantity: 1 };
        state.cartItems.push(incomingProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const restOfProducts = state.cartItems.filter(
        (productItem) => productItem.id !== action.payload.id
      );
      state.cartItems = restOfProducts;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseItemQuantity(state, action) {
      const ifExistsIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[ifExistsIndex].itemQuantity > 0) {
        state.cartItems[ifExistsIndex].itemQuantity -= 1;
      }
      if (state.cartItems[ifExistsIndex].itemQuantity === 0) {
        const restOfProducts = state.cartItems.filter(
          (productItem) => productItem.id !== action.payload.id
        );
        state.cartItems = restOfProducts;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // state.cartProductTotalQuantity = 0;
      // state.cartProductTotalAmount = 0;
    },
    totalPayment(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (productTotal, productItem) => {
          const { price, itemQuantity } = productItem;
          const itemTotal = price * itemQuantity;

          productTotal.total += itemTotal;
          productTotal.quantity += itemQuantity;

          return productTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartProductTotalQuantity = quantity;
      state.cartProductTotalAmount = total;
    },
  },
});

export const CartActions = cartSlice.actions;

export default cartSlice.reducer;
