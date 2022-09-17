import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CartActions } from "../store/cart-slice";
import { Card, Col, Row, Button, Text, Progress } from "@nextui-org/react";

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.products.data);

  const loadedProducts = [];

  for (const key in dataProducts) {
    loadedProducts.push({
      id: dataProducts[key].id,
      category: dataProducts[key].category,
      name: dataProducts[key].title,
      price: dataProducts[key].price,
      image: dataProducts[key].image,
      description: dataProducts[key].description,
      rating: dataProducts[key].rating.rate,
      count: dataProducts[key].rating.count,
    });
  }
  let currentProductToDisplay = loadedProducts.find(
    (product) => +product.id === +params.productId
  );

  const addItemHandler = () => {
    dispatch(CartActions.addToCart(currentProductToDisplay));
    // dispatch(itemAmountActions.addItem());
  };

  return (
    <div className="product-detail">
      <Card className="product-detail-card">
        <Card.Header className="product-detail-header">
          <Col className="product-detail-col">
            <Text
              className="product-detail-text"
              size={12}
              weight="bold"
              transform="uppercase"
              color="#000"
            >
              {currentProductToDisplay.name &&
              currentProductToDisplay.name.length > 10
                ? currentProductToDisplay.name.split(" ").slice(0, 3).join(" ")
                : currentProductToDisplay.name}
            </Text>
            <Text
              h3
              color="black"
              className="product-detail-description"
              style={{ fontSize: "1.35rem" }}
            >
              {currentProductToDisplay.description}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body className="product-detail-body">
          <Card.Image
            src={currentProductToDisplay.image}
            width="100%"
            height="100%"
            objectFit="contain"
            alt="Card example background"
            className="product-detail-img"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#ffffff66",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Text className="product-detail-rating">
                Rating: {currentProductToDisplay.rating} / 5
              </Text>
              <span className="rating-bar">
                <Progress
                  className="product-detail-ratingbar"
                  shadow
                  squared="true"
                  value={currentProductToDisplay.rating * 20}
                  color={
                    currentProductToDisplay.rating > 3 ? "success" : "error"
                  }
                  status={
                    currentProductToDisplay.rating > 3 ? "success" : "error"
                  }
                />
              </span>
            </Col>
            <Col style={{ marginRight: "2rem" }}>
              <Row justify="flex-end">
                <Button
                  auto
                  rounded
                  color="secondary"
                  className="product-detail-btn"
                  onPress={() => addItemHandler(currentProductToDisplay)}
                >
                  <Text
                    css={{ background: "#000", color: "#fff" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    Add To Cart
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ProductDetail;
