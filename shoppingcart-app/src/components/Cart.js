import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidV4 } from "uuid";
import { CartActions } from "../store/cart-slice";
import { Button } from "@nextui-org/react";
import CartItem from "./CartItem";
import { NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItemsForDisplay = useSelector((state) => state.cart.cartItems);
  const clearingCartHandler = () => {
    dispatch(CartActions.clearCart());
  };
  return (
    <div className="cart-container">
      <div className="btn-container-cart">
        <NavLink
          to="/products"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          <Button
            css={{
              background: "#000",
              marginLeft: "1rem",
              paddingRight: "10.2rem",
              paddingLeft: "10.2rem",
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              textTransform: "uppercase",
              letterSpacing: ".4rem",
              "@mdMax": {
                fontSize: "0.8rem",
                padding: "1rem",
              },
            }}
          >
            home
          </Button>
        </NavLink>
        <NavLink
          to="/checkout"
          style={{ color: "#fff", textDecoration: "none" }}
        >
          <Button
            css={{
              background: "#000",
              marginLeft: "1rem",
              paddingRight: "8rem",
              paddingLeft: "8rem",
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              textTransform: "uppercase",
              letterSpacing: ".4rem",
              "@mdMax": {
                fontSize: "0.8rem",
                padding: "1rem",
              },
            }}
          >
            Check-Out
          </Button>
        </NavLink>
      </div>
      {cartItemsForDisplay.map((item) => (
        <CartItem
          item={item}
          key={uuidV4()}
          id={item.id}
          name={item.name}
          description={item.description}
          rating={item.rating}
          count={item.count}
          image={item.image}
          price={item.price}
          category={item.category}
          quantity={item.itemQuantity}
        />
      ))}
      <Button
        css={{
          background: "#000",
          marginLeft: "1rem",
          paddingRight: "8rem",
          paddingLeft: "8rem",
          fontSize: "1.4rem",
          fontFamily: "Spectral",
          textTransform: "uppercase",
          letterSpacing: ".4rem",
          "@mdMax": {
            fontSize: "0.8rem",
            padding: "1rem",
          },
        }}
        onPress={() => {
          clearingCartHandler();
        }}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
