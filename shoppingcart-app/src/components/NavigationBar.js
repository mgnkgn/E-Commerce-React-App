import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../store/admin-slice";
import { CartActions } from "../store/cart-slice";
import { showCartActions } from "../store/showcart-slice";
import { showCheckoutActions } from "../store/showcheckout-slice";
import { Navbar, Text, Badge } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import AdminLogin from "./AdminLogin";

const NavigationBar = () => {
  const generalCartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(CartActions.totalPayment());
  }, [generalCartState]);
  const cartProductTotalQuantity = useSelector(
    (state) => state.cart.cartProductTotalQuantity
  );

  const dispatch = useDispatch();
  const adminLoginHandler = () => {
    dispatch(adminActions.login());
    dispatch(showCartActions.makeCartInvisible());
    dispatch(showCheckoutActions.makeCheckoutInvisible());
  };
  const showCartHandler = () => {
    dispatch(showCartActions.makeCartShow());
    dispatch(showCheckoutActions.makeCheckoutInvisible());
  };
  const goBackFromCartHandler = () => {
    dispatch(showCartActions.makeCartInvisible());
    dispatch(adminActions.logout());
    dispatch(showCheckoutActions.makeCheckoutInvisible());
  };
  return (
    <div className="nav-bar">
      <Navbar
        variant="floating"
        isBordered="true"
        css={{
          background: "#fff",
          position: "static",
          "@mdMax": {
            width: "98vw",
          },
        }}
      >
        <Navbar.Brand>
          <Text
            b
            color="#000"
            hideIn="xs"
            css={{
              fontSize: "2rem",
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
            }}
          >
            <NavLink to="/products" style={{ textDecoration: "none" }}>
              <span className="logo" onClick={goBackFromCartHandler}>
                <img
                  src={require("../images/ready-logo-pinguin.png")}
                  alt="logo"
                />
              </span>
            </NavLink>
            <NavLink
              to="/products"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <span className="shopinguin" onClick={goBackFromCartHandler}>
                Shopinguin
              </span>
            </NavLink>
          </Text>
        </Navbar.Brand>
        <Navbar.Content>
          <NavLink
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#000",
              marginRight: "-1.8rem",
            }}
          >
            Cart
          </NavLink>

          <Badge
            content={cartProductTotalQuantity}
            css={{
              fontSize: "1rem",
              color: "#fff",
              padding: ".35rem",
              background: "black",
            }}
          >
            <NavLink
              to="/cart"
              style={{ textDecoration: "none", color: "#000" }}
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </NavLink>
          </Badge>

          <Navbar.Item>
            <AdminLogin onPress={adminLoginHandler} />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
