import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../store/cart-slice";

const emptyInput = (value) => value.trim() === "";

const OrderInfoForm = (props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartItemsForDisplay = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [inputsValid, setInputsValid] = useState({
    name: true,
    surname: true,
    street: true,
    city: true,
    date: true,
  });
  const clearingCartHandler = () => {
    dispatch(CartActions.clearCart());
  };

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const dateInputRef = useRef();

  const submitOrderForm = async (orderInfo) => {
    setIsSubmitting(true);
    await fetch(
      "https://shopinguin-i-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userInfo: orderInfo,
          orderedProducts: cartItemsForDisplay,
        }),
      }
    );
    setIsSubmitting(false);
    clearingCartHandler();
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    const enteredNameIsValid = !emptyInput(enteredName);
    const enteredSurnameIsValid = !emptyInput(enteredSurname);
    const enteredStreetIsValid = !emptyInput(enteredStreet);
    const enteredCityIsValid = !emptyInput(enteredCity);
    const enteredDateIsValid = !emptyInput(enteredDate);

    setInputsValid({
      name: enteredNameIsValid,
      surname: enteredSurnameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      date: enteredDateIsValid,
    });

    // Checking if every input is valid or not
    const completeValidInput =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredDateIsValid;

    nameInputRef.current.value = "";
    surnameInputRef.current.value = "";
    streetInputRef.current.value = "";
    cityInputRef.current.value = "";
    dateInputRef.current.value = "";
    if (!completeValidInput) {
      return;
    }
    // Now if it is all valid, send it to firebase
    submitOrderForm({
      uName: enteredName,
      uSurname: enteredSurname,
      uStreet: enteredStreet,
      uCity: enteredCity,
      uDate: enteredDate.split("-").reverse().join("/"),
    });
  };
  return (
    <div className="form-order-container">
      <form className="form-order" onSubmit={confirmHandler}>
        <div className="form-rows-container">
          <div className="form-row">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
            {!inputsValid.name && <p>Please enter a valid name</p>}
          </div>
          <div className="form-row">
            <label htmlFor="surname">Your Surname</label>
            <input type="text" id="surname" ref={surnameInputRef} />
            {!inputsValid.surname && <p>Please enter a valid surname</p>}
          </div>
          <div className="form-row">
            <label htmlFor="street">Street Name</label>
            <input type="text" id="street" ref={streetInputRef} />
            {!inputsValid.street && <p>Please enter a valid street</p>}
          </div>
          <div className="form-row">
            <label htmlFor="city">City Name</label>
            <input type="text" id="city" ref={cityInputRef} />
            {!inputsValid.city && <p>Please enter a valid city</p>}
          </div>
          <div className="form-row">
            <label htmlFor="date">Date</label>
            <input type="date" id="date" ref={dateInputRef} />
            {!inputsValid.date && <p>Please enter a valid date</p>}
          </div>
        </div>
        <div className="form-order-btns">
          <button
            css={{
              background: "#000",
              marginLeft: "1rem",
              paddingRight: "10.2rem",
              paddingLeft: "10.2rem",
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              textTransform: "uppercase",
              letterSpacing: ".4rem",
            }}
            type="button"
          >
            Cancel
          </button>
          <button
            css={{
              background: "#000",
              marginLeft: "1rem",
              paddingRight: "10.2rem",
              paddingLeft: "10.2rem",
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              textTransform: "uppercase",
              letterSpacing: ".4rem",
            }}
            type="submit"
            onClick={confirmHandler}
          >
            Order Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderInfoForm;
