import React, { useEffect } from "react";
import { Card, Text, Button, Progress, Table } from "@nextui-org/react/";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faMinusCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const generalCartState = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(CartActions.totalPayment());
  }, [generalCartState]);
  const removeFromCartHandler = (item) => {
    dispatch(CartActions.removeFromCart(item));
  };
  const quantityDecreaseHandler = (item) => {
    dispatch(CartActions.decreaseItemQuantity(item));
  };
  const quantityIncreaseHandler = (item) => {
    dispatch(CartActions.addToCart(item));
  };
  return (
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        Bottom: "2rem",
      }}
    >
      <Table.Header css={{}}>
        <Table.Column css={{}}>Product</Table.Column>
        <Table.Column> Name / Price / Rating </Table.Column>
        <Table.Column>Quantity</Table.Column>
        <Table.Column>Total Price</Table.Column>
        <Table.Column>Discard</Table.Column>
      </Table.Header>
      <Table.Body css={{}}>
        <Table.Row key="1">
          <Table.Cell css={{ width: "12rem" }}>
            {" "}
            <Card className="card-image">
              <Card.Image
                src={props.image}
                objectFit="contain"
                width="90%"
                height={140}
                alt={props.name}
                css={{
                  marginTop: "1rem",
                  "@mdMax": {},
                }}
              />
            </Card>
          </Table.Cell>
          <Table.Cell css={{ width: "60rem" }}>
            <Card className="card-summary" css={{}}>
              <Card.Body
                css={{
                  overflowY: "hidden",
                  "@mdMax": {
                    marginLeft: "1rem",
                    marginTop: "1.25rem",
                  },
                }}
              >
                <Text className="card-summary-name">{props.name}</Text>

                <Text
                  className="card-summary-price"
                  css={{
                    textGradient: "45deg, #000, #4D7A7F",

                    "@mdMax": {
                      fontSize: ".95rem",
                    },
                  }}
                >
                  Price: {props.price.toFixed(2)} $
                </Text>

                <Text
                  css={{
                    fontSize: "1.5rem",
                    "@mdMax": {
                      fontSize: "0.9rem",
                    },
                  }}
                >
                  Rating: {props.rating} / 5
                </Text>
                <span className="rating-bar">
                  <Progress
                    className="progress-rating"
                    shadow
                    squared="true"
                    value={props.rating * 20}
                    color={props.rating > 3 ? "success" : "error"}
                    status={props.rating > 3 ? "success" : "error"}
                  />
                </span>
              </Card.Body>
            </Card>
          </Table.Cell>
          <Table.Cell css={{ width: "15rem" }}>
            <Card className="card-qt">
              <Card.Body
                css={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  transform: "translateX(-1rem) translateY(3rem) ",
                  "@mdMax": {
                    overflow: "hidden",
                  },
                }}
              >
                <Text
                  css={{
                    fontSize: "1.75rem",
                    fontFamily: "Spectral",
                    marginTop: "-.75rem",
                    "@mdMax": {
                      fontSize: "1.25rem",
                      transform: "translateY(2rem)",
                      margin: "2 auto",
                    },
                  }}
                >
                  {props.quantity}
                </Text>
                <div className="cart-minus-plus">
                  <button onClick={() => quantityDecreaseHandler(props.item)}>
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                  <button onClick={() => quantityIncreaseHandler(props.item)}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Table.Cell>
          <Table.Cell css={{ width: "12rem" }}>
            <Card className="card-total-price">
              <Card.Body
                css={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  transform: "translateX(-1rem) ",
                  overflow: "hidden",
                }}
              >
                <Text
                  css={{
                    fontSize: "1.85rem",
                    fontFamily: "Spectral",
                    marginTop: "-.75rem",
                    margin: "auto",
                  }}
                >
                  {(props.quantity * props.price).toFixed(2)} $
                </Text>
              </Card.Body>
            </Card>
          </Table.Cell>
          <Table.Cell
            css={{
              width: "15rem",
            }}
          >
            <Card className="card-delete">
              <Card.Body
                css={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  transform: "translateX(-1rem) ",
                  "@mdMax": {
                    justifyContent: "center",
                    overflow: "hidden",
                  },
                }}
              >
                <Button
                  onPress={() => removeFromCartHandler(props.item)}
                  color="warning"
                  css={{
                    background: "none",
                    color: "#000",
                    fontSize: "2.5rem",
                    "@mdMax": {
                      transform: "scale(0.7)",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Card.Body>
            </Card>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default CartItem;
