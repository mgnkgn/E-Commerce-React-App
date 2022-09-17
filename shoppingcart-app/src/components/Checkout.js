import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { Table, Card, Text, Button } from "@nextui-org/react";
const Checkout = () => {
  const cartItemsForDisplay = useSelector((state) => state.cart.cartItems);
  const totalPayment = useSelector(
    (state) => state.cart.cartProductTotalAmount
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column
            css={{
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              fontWeight: "500",
            }}
          >
            Product
          </Table.Column>
          <Table.Column
            css={{
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              fontWeight: "500",
            }}
          >
            Quantity
          </Table.Column>
          <Table.Column
            css={{
              fontSize: "1.4rem",
              fontFamily: "Spectral",
              fontWeight: "500",
            }}
          >
            Price
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {cartItemsForDisplay.map((item) => (
            <Table.Row key={uuidV4()}>
              <Table.Cell
                css={{
                  fontSize: "1.2rem",
                  fontFamily: "Spectral",
                  fontWeight: "500",
                }}
              >
                {item.name}
              </Table.Cell>
              <Table.Cell
                css={{
                  fontSize: "1.2rem",
                  fontFamily: "Spectral",
                  fontWeight: "500",
                }}
              >
                {item.itemQuantity}
              </Table.Cell>
              <Table.Cell
                css={{
                  fontSize: "1.2rem",
                  fontFamily: "Spectral",
                  fontWeight: "500",
                }}
              >
                {item.price} $
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Card css={{ width: "100%", background: "#000" }}>
        <Card.Body
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text
            className="co-total"
            css={{
              "@mdMax": {
                fontSize: "1rem",
                letterSpacing: ".225rem",
              },
            }}
          >
            Total Amount (Shipping Included):
          </Text>
          <Text className="co-payment">{totalPayment} $ </Text>
        </Card.Body>
      </Card>
      <NavLink to="/order" style={{ textDecoration: "none", color: "#fff" }}>
        <Button
          css={{
            color: "#fff",
            background: "#000",
            padding: "2.5rem",
            width: "100%",
            border: "1px solid #fff",
            fontSize: "2rem",
            marginTop: "1rem",
            textTransform: "uppercase",
            letterSpacing: ".75rem",
            fontFamily: "Spectral",
            fontWeight: "700",
          }}
        >
          Order Now
        </Button>
      </NavLink>
    </div>
  );
};

export default Checkout;
