import React, { useState, useRef } from "react";
import { Modal, Button, Text, Input, Link } from "@nextui-org/react";
import { NavLink, useHistory } from "react-router-dom";

const AdminLogin = () => {
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);
  const adminInputRef = useRef();
  const adminPassInputRef = useRef();
  const history = useHistory();
  let adminLink = "";

  const handleClick = () => {
    const enteredAdmin = adminInputRef.current.value;
    const enteredPassAdmin = adminPassInputRef.current.value;

    if (enteredAdmin.length > 4 && enteredPassAdmin.length > 4) {
      adminLink = "/admin";
    } else {
      adminLink = "/products";
    }

    history.push(adminLink);
    setVisible(false);
  };

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
          fontSize: "1.40rem",
          padding: "3rem",
          background: "#000",
          color: "#fff",
        }}
        onClick={handler}
      >
        Admin
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
            Login as
            <Text
              b
              size={20}
              css={{
                marginLeft: "2px",
                color: "orange",
                fontFamily: "Spectral",
              }}
            >
              Administrator
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            css={{ background: "#fff", fontSize: "1.35rem" }}
            clearable
            required
            bordered
            color="warning"
            fullWidth
            size="lg"
            placeholder="Admin"
            ref={adminInputRef}
          />
          <Input.Password
            css={{ background: "#fff", fontSize: "1.35rem" }}
            clearable
            bordered
            fullWidth
            color="warning"
            size="lg"
            placeholder="Password"
            ref={adminPassInputRef}
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
            onClick={closeHandler}
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
          {/* <NavLink
            to={`${adminLink}`}
            style={{ textDecoration: "none", color: "#000" }}
          > */}
          <Button
            auto
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
            onPress={handleClick}
          >
            Login
          </Button>
          {/* </NavLink> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminLogin;
