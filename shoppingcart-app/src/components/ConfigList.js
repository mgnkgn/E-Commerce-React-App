import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Text, Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
import { deleteProduct, updateProduct } from "../store/products-slice";

const ConfigList = (props) => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
  };
  let dataProducts = useSelector((state) => state.products.data);
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const imageurlInputRef = useRef();
  const categoryInputRef = useRef();
  const descriptionInputRef = useRef();
  const rateInputRef = useRef();
  const idInputRef = useRef();

  const addProductUpdateHandler = (id) => {
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
      id: enteredId,
      key: uuidV4(),
    };
    dispatch(updateProduct({ id: id, data: data }));
    dispatch(deleteProduct(id));

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
  return (
    <div className="config-list-row">
      <div className="config-row-element config-id">
        <span className="span-id-edit" onClick={handler}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
        {props.id}
      </div>
      <div className="config-row-element config-name">
        {props.name && props.name.length > 10
          ? props.name.split(" ").slice(0, 3).join(" ")
          : props.name}
      </div>
      <div className="config-row-element config-category">{props.category}</div>
      <div className="config-row-element config-icon">
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            props.deleteHandler(props.id);
          }}
        />
      </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        className="modal-form"
        onClose={closeHandler}
        style={{ overflow: "scroll" }}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Product Update
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
          <div
            className="modal-footer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              auto
              flat
              color="error"
              onClick={closeHandler}
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
              auto
              onClick={() => {
                addProductUpdateHandler(props.id);
              }}
              style={{
                background: "#000",
                width: "10rem",
                textTransform: "uppercase",
                fontFamily: "Spectral",
                fontSize: "1.2rem",
                letterSpacing: "1.8px",
              }}
            >
              Done
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfigList;
