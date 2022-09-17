import React, { useRef, useState } from "react";
import { Modal, Button, Text, Input, Link } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import CartActions from "../store/cart-slice";

const emptyInput = (value) => value.trim() === "";

const OrderNow = (props) => {
  const [inputsValid, setInputsValid] = useState({
    name: true,
    surname: true,
    street: true,
    city: true,
  });
  const dispatch = useDispatch();
  const clearingCartHandler = () => {
    dispatch(CartActions.clearCart());
  };

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = () => {
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !emptyInput(enteredName);
    const enteredSurnameIsValid = !emptyInput(enteredSurname);
    const enteredStreetIsValid = !emptyInput(enteredStreet);
    const enteredCityIsValid = !emptyInput(enteredCity);

    setInputsValid({
      name: enteredNameIsValid,
      surname: enteredSurnameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
    });

    // Checking if every input is valid or not
    const completeValidInput =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid;
    if (!completeValidInput) {
      return;
    }
    // Now if it is all valid, send it to firebase
    props.submitOrderForm({
      name: enteredName,
      surname: enteredSurname,
      street: enteredStreet,
      city: enteredCity,
    });
  };

  //   modal
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button
        auto
        flat
        as={Link}
        css={{
          color: "#fff",
          background: "#000",
          padding: "2.5rem",
          paddingBottom: "3.3rem",
          width: "100%",
          fontSize: "2rem",
          marginTop: "1rem",
          textTransform: "uppercase",
          letterSpacing: ".75rem",
          fontFamily: "Spectral",
          fontWeight: "700",
        }}
        onPress={handler}
      >
        ORDER NOW
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        css={{ background: "#000", color: "#fff" }}
      >
        <Modal.Header>
          <Text
            id="modal-title"
            size={18}
            css={{ color: "#fff", fontFamily: "Spectral" }}
          >
            Order Information
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            css={{ background: "#fff", fontSize: "1.35rem" }}
            required
            fullWidth
            color="warning"
            size="lg"
            placeholder="Enter your name"
            label="Name"
            ref={nameInputRef}
          />

          <Input
            css={{ background: "#fff", fontSize: "1.35rem" }}
            fullWidth
            color="warning"
            size="lg"
            placeholder="Enter your surname"
            label="Surname"
            ref={surnameInputRef}
          />
          <Input
            css={{ background: "#fff", fontSize: "1.35rem" }}
            fullWidth
            color="warning"
            size="lg"
            placeholder="Enter your street"
            label="Street"
            ref={streetInputRef}
          />
          <Input
            css={{ background: "#fff", fontSize: "1.35rem" }}
            fullWidth
            color="warning"
            size="lg"
            placeholder="Enter your city"
            label="City"
            ref={cityInputRef}
          />
        </Modal.Body>
        <Modal.Footer
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            auto
            flat
            color="error"
            onPress={closeHandler}
            css={{
              color: "#000",
              background: "grey",
              padding: "1rem 4rem",
              fontSize: "1.2rem",
              fontFamily: "Spectral",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Close
          </Button>

          <Button
            auto
            onClick={() => {
              confirmHandler();
              closeHandler();
              clearingCartHandler();
            }}
            css={{
              color: "#000",
              background: "orange",
              padding: "1rem 4rem",
              fontSize: "1.2rem",
              fontFamily: "Spectral",
              fontWeight: "600",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderNow;
