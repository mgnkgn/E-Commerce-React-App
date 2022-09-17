import React from "react";
import NavigationBar from "./components/NavigationBar";
import ProductsList from "./components/ProductsList";
import ProductDetail from "./components/ProductDetail";
import Checkout from "./components/Checkout";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";

import AdminPanel from "./components/AdminPanel";
import Cart from "./components/Cart";
import OrderInfoForm from "./components/OrderInfoForm";

function App() {
  const isAdminLoggedIn = useSelector((state) => state.admin.adminLoggedIn);
  const isCartShown = useSelector((state) => state.showCart.isCartShown);
  const isCheckoutShown = useSelector(
    (state) => state.showCheckout.isCheckoutShown
  );

  return (
    <div className="App">
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/products" />
        </Route>
        <Route path="/products" exact>
          <ProductsList />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
        <Route path="/admin">
          <AdminPanel />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/order">
          <OrderInfoForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
