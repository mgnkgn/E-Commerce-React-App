import React, { useEffect, useState } from "react";

import { adminActions } from "../store/admin-slice";
import { User, Button } from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import SoldProductsList from "./SoldProductsList";
import ChartSoldProducts from "./ChartSoldProducts";
import AdminConfig from "./AdminConfig";

class AdminPanel extends React.Component {
  state = {
    adminData: [],
  };

  componentDidMount() {
    const fetchAdminData = async () => {
      const response = await fetch(
        "https://shopinguin-i-default-rtdb.firebaseio.com/Orders.json"
      ).then();

      if (!response.ok) {
        throw new Error("Something went wrong🐧");
      }
      const responseAdminData = await response.json();

      const loadedAdminData = [];

      for (const key in responseAdminData) {
        loadedAdminData.push({
          id: key,
          orderedProducts: responseAdminData[key]["orderedProducts"],
          userInfo: responseAdminData[key]["userInfo"],
        });
      }

      const loadedAdminDataArranged = loadedAdminData.reverse();
      this.setState({ adminData: loadedAdminDataArranged });
    };

    fetchAdminData().catch((error) => {
      console.log(error.message);
    });
  }
  render() {
    const relatedData = [];

    for (let i = 0; i < this.state.adminData.length; i++) {
      for (
        let j = 0;
        j < this.state.adminData[i]["orderedProducts"].length;
        j++
      ) {
        relatedData.push({
          name: this.state.adminData[i]["orderedProducts"][j].name,
          price: this.state.adminData[i]["orderedProducts"][j].price,
          stock: this.state.adminData[i]["orderedProducts"][j].count,
          qt: this.state.adminData[i]["orderedProducts"][j].itemQuantity,
          uName: this.state.adminData[i]["userInfo"].uName,
          uSurname: this.state.adminData[i]["userInfo"].uSurname,
          uCity: this.state.adminData[i]["userInfo"].uCity,
          uStreet: this.state.adminData[i]["userInfo"].uStreet,
          uDate: this.state.adminData[i]["userInfo"].uDate,
        });
      }
    }

    const relatedDataToDisplay = relatedData.map((el) => (
      <SoldProductsList
        el={el}
        key={uuidV4()}
        name={el.name}
        qt={el.qt}
        uName={el.uName}
        price={el.price}
        uCity={el.uCity}
        uSurname={el.uSurname}
        uStreet={el.uStreet}
        uDate={el.uDate}
      />
    ));

    return (
      <div className="admin-panel-container">
        <div className="admin-info">
          <User
            css={{}}
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            name="Oswald Cobblepot"
            size="xl"
            color="primary"
            squared
            bordered
            description="Admin #3"
          />
          <Button
            css={{
              color: "#4CECFF",
              fontSize: "1.3rem",
              textTransform: "uppercase",
              letterSpacing: "1.2px",
              fontWeight: "600",
              fontFamily: "Spectral",
              background: "#000",
              borderColor: "#4D7A7F",
              padding: "1.8rem",
              marginLeft: "1.5rem",
              "@mdMax": {
                fontSize: "0.9rem",
                fontWeight: "400",
                padding: "0.5rem",
                size: "xs",
                letterSpacing: "0.5px",
              },
            }}
            bordered
            rounded
            color="secondary"
            size="md"
          >
            <NavLink
              to="/products"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Logout
            </NavLink>
          </Button>
        </div>

        <div className="panel-first-row">
          <div className="panel-chart">
            <ChartSoldProducts relatedData={relatedData} />
          </div>
          <div className="panel-add">
            <AdminConfig />
          </div>
        </div>
        <div className="sold-products-container">
          <h1 className="main-header-sold-products">Recent Sales</h1>
          <div className="sold-products-row-container head-products-row-container">
            <div className="sold-row-element head-sold-table">Product</div>
            <div className="sold-row-element head-sold-table">Quantity</div>
            <div className="sold-row-element head-sold-table">
              Price/ <span> unit</span>
            </div>
            <div className="sold-row-element head-sold-table">
              Customer's Name
            </div>
            <div className="sold-row-element head-sold-table">
              Customer's Address
            </div>
          </div>
          {relatedDataToDisplay}
        </div>
      </div>
    );
  }
}

export default AdminPanel;
