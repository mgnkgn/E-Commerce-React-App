import React from "react";
import { useDispatch } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { CartActions } from "../store/cart-slice";
import { Grid, Card, Text, Row, Col, Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductItem = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(CartActions.addToCart(props.item));
  };

  return (
    <Grid xs={6} sm={4} key={uuidV4()}>
      <Card
        isPressable
        variant="shadow"
        css={{ background: "#fff", w: "80rem", h: "40rem" }}
      >
        <Card.Header
          css={{
            position: "absolute",
            zIndex: 1,
            top: 5,
          }}
        >
          <Col>
            <Text
              size={10}
              weight="bold"
              transform="uppercase"
              className="product-list-text"
              css={{
                textAlign: "center",
                textGradient: "45deg, #000, #696969",
                fontFamily: "Spectral",
              }}
            >
              {props.name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body
          css={{
            p: 0,
            marginTop: "5rem",
            paddingTop: "1.5rem",
            paddingBottom: ".75rem",
            paddingLeft: ".15rem",
            paddingRight: ".15rem",
          }}
        >
          <Card.Image
            src={props.image}
            objectFit="contain"
            width="90%"
            height={250}
            alt={props.name}
            css={{ mixBlendMode: "multiply" }}
          />
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }} isBlurred="true">
          <Row wrap="wrap" justify="space-around" align="center">
            <Text
              css={{
                textGradient: "45deg, #000, #4D7A7F",
                fontWeight: "$semibold",
                fontSize: "2rem",
                fontFamily: "Spectral",
              }}
            >
              {props.price.toFixed(2)} $
            </Text>
            <span className="add-discard-container">
              <Text className="add-item">
                Add To Cart
                <li className="font-icon">
                  <Button
                    className="btn-add"
                    onPress={() => addItemHandler(props.item)}
                    css={{
                      color: "#000",
                      fontSize: "1.3rem",
                      textTransform: "uppercase",
                      letterSpacing: ".85px",
                      fontWeight: "600",
                      fontFamily: "Spectral",
                      background: "#fff",
                      border: ".5px solid black",
                      padding: "1rem",
                      borderRadius: "20rem",
                      "@mdMax": {
                        fontSize: "0.9rem",
                        fontWeight: "400",
                        padding: "0.5rem",
                        size: "xs",
                        letterSpacing: "0.5px",
                      },
                    }}
                    bordered
                    size="xs"
                    rounded
                    color="secondary"
                  >
                    <FontAwesomeIcon className="icon-plus" icon={faPlus} />
                  </Button>
                </li>
              </Text>
            </span>
          </Row>
        </Card.Footer>
        <Card.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Text>
            <Link
              to={`/products/${props.id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Button
                className="btn-detail"
                bordered
                rounded
                color="secondary"
                size="md"
              >
                <Text className="text-detail">Details</Text>
              </Button>
            </Link>
          </Text>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default ProductItem;
