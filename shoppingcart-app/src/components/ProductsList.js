import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { Grid, Button, Loading } from "@nextui-org/react";
import { getProducts } from "../store/products-slice";
import ProductDetail from "./ProductDetail";

const ProductsList = () => {
  const dispatch = useDispatch();
  const dataProducts = useSelector((state) => state.products.data);
  const status = useSelector((state) => state.products.status);
  const fetchProductsHandler = () => {
    window.localStorage.clear();
    dispatch(getProducts());
  };
  console.log(dataProducts);
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, []);
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

  const productsDisplay = loadedProducts.map((item) => (
    <ProductItem
      item={item}
      key={item.id}
      id={item.id}
      name={item.name}
      description={item.description}
      rating={item.rating}
      count={item.count}
      image={item.image}
      price={item.price}
      category={item.category}
    />
  ));

  return (
    <div className="list-container">
      <Button
        css={{
          background: "#000",
          paddingRight: "10.2rem",
          paddingLeft: "10.2rem",
          fontSize: "2.5rem",
          fontFamily: "Spectral",
          textTransform: "uppercase",
          letterSpacing: "2rem",
          width: "100%",
          height: "3.5rem",
          "@mdMax": {
            fontSize: "1.25rem",
            marginLeft: "0.25rem",
            letterSpacing: ".75rem",
          },
        }}
        onClick={fetchProductsHandler}
      >
        Load Products
      </Button>
      <Grid.Container gap={5} justify="flex-start">
        {status === true ? (
          <>
            <Loading
              size="xl"
              type="gradient"
              textColor="primary"
              style={{ marginLeft: "45.5%", marginTop: "5rem", color: "#000" }}
            >
              <img
                src={require("../images/penguin_jumping.gif")}
                alt="loading gif"
                className="gif"
              />
            </Loading>
          </>
        ) : (
          productsDisplay
        )}
      </Grid.Container>
    </div>
  );
};

export default ProductsList;
