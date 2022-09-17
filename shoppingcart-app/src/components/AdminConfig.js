import React, { useEffect, useCallback, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, addProduct } from "../store/products-slice";
import ConfigList from "./ConfigList";
import { v4 as uuidV4 } from "uuid";
import { deleteProduct, updateProduct } from "../store/products-slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Text, Input } from "@nextui-org/react";

const AdminConfig = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const imageurlInputRef = useRef();
  const categoryInputRef = useRef();
  const descriptionInputRef = useRef();
  const rateInputRef = useRef();
  const idInputRef = useRef();

  const closeHandler = () => {
    setVisible(false);
  };
  const addProductSubmitHandler = () => {
    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredUrl = imageurlInputRef.current.value;
    const enteredCategory = categoryInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredRate = rateInputRef.current.value;
    const enteredId = idInputRef.current.value;

    const data = {
      title: enteredTitle,
      price: +enteredPrice,
      description: enteredDescription,
      image: enteredUrl,
      category: enteredCategory,
      rating: { rate: +enteredRate, count: 100 },
      id: +enteredId,
      key: uuidV4(),
    };
    dispatch(addProduct(data));
    setVisible(false);

    titleInputRef.current.value = "";
    priceInputRef.current.value = "";
    imageurlInputRef.current.value = "";
    categoryInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    rateInputRef.current.value = "";
    idInputRef.current.value = "";
  };
  const dispatch = useDispatch();
  let dataProducts = useSelector((state) => state.products.data);
  const deleteHandler = useCallback((id) => {
    dispatch(deleteProduct(id));
  }, []);

  const updateHandler = (id, data) => {
    dispatch(updateProduct(id));
  };

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  const dataForConfig = [];
  for (let i = 0; i < dataProducts.length; i++) {
    dataForConfig.push({
      id: dataProducts[i].id,
      category: dataProducts[i].category,
      name: dataProducts[i].title,
      price: dataProducts[i].price,
      image: dataProducts[i].image,
      description: dataProducts[i].description,
      rating: dataProducts[i].rating.rate,
      count: dataProducts[i].rating.count,
    });
  }

  const productsDisplay = dataForConfig.map((item) => (
    <ConfigList
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
      deleteHandler={deleteHandler}
      updateHandler={updateHandler}
    />
  ));

  return (
    <>
      <div className="config-list-container">
        <span>
          <Button
            css={{
              background: "#f1f8f7",
              color: "#000",
              paddingRight: "10.2rem",
              paddingLeft: "10.2rem",
              fontSize: "1.35rem",
              fontFamily: "Spectral",
              textTransform: "uppercase",
              letterSpacing: "1.25px",
              fontWeight: "700",
              width: "100%",
              height: "3.5rem",
            }}
            auto
            onClick={handler}
          >
            Add Product
            <FontAwesomeIcon
              icon={faCirclePlus}
              style={{ marginLeft: "1rem" }}
            />
          </Button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            className="modal-form"
            style={{
              overflow: "visible scroll",
              margin: "1rem 3rem",
            }}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Product Adding
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter the product title"
                label="TITLE"
                ref={titleInputRef}
              />
              <Input
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter the product price"
                label="PRICE"
                type="number"
                ref={priceInputRef}
              />
              <Input
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter the product image url"
                label="IMAGE URL"
                type="text"
                ref={imageurlInputRef}
              />
              <Input
                fullWidth
                color="primary"
                size="lg"
                placeholder="Enter the product category"
                label="CATEGORY"
                type="text"
                ref={categoryInputRef}
              />
              <Input
                fullWidth
                color="primary"
                placeholder="Enter the product description"
                label="DESCRIPTION"
                type="text"
                ref={descriptionInputRef}
              />
              <Input
                fullWidth
                color="primary"
                placeholder="Enter the rate for product out of 5"
                label="RATE"
                type="number"
                ref={rateInputRef}
              />
              <Input
                fullWidth
                color="primary"
                placeholder="Enter the product ID (Higher than 20)"
                label="ID"
                type="number"
                ref={idInputRef}
              />
              <div className="modal-footer">
                <Button
                  auto
                  flat
                  color="error"
                  onClick={closeHandler}
                  className="modal-form-btn"
                  style={{
                    background: "#000",
                    width: "10rem",
                    textTransform: "uppercase",
                    fontFamily: "Spectral",
                    fontSize: "1.2rem",
                    letterSpacing: "1.8px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  // auto
                  onClick={addProductSubmitHandler}
                  className="modal-form-btn"
                >
                  Done
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </span>
        <h1 className="config-header">Product Configuration</h1>
        <div className="config-list-row config-head">
          <div className="config-row-element config-id config-head-id">ID</div>
          <div className="config-row-element config-name config-head-name">
            NAME
          </div>
          <div className="config-row-element config-category config-head-category">
            CATEGORY
          </div>
          <div className="config-row-element config-icon config-head-delete">
            Delete
          </div>
        </div>
        {productsDisplay}
      </div>
    </>
  );
};

export default AdminConfig;
