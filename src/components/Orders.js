/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react";
import Order from "./Order";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../StateProvider";
import { db } from "../firebase";

function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  const handleOrderDelete = () => {
    let confirmDelete = confirm("確認將訂單資料清除？");
    let ref = db.collection("users").doc(user?.uid).collection("orders");
    if (confirmDelete) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .onSnapshot((snapshot) =>
          snapshot.docs.forEach((doc) =>
            ref
              .doc(doc.id)
              .delete()
              .then(() => console.log("已刪除訂單資料"))
              .catch((err) => console.log(err.message))
          )
        );
    }
  };

  return (
    <div className={classes.orders}>
      {user && (
        <div className={classes.ordersNav}>
          <h2>查看訂單</h2>
          <span onClick={handleOrderDelete}>清除訂單資料</span>
        </div>
      )}
      <div className={classes.ordersOrder}>
        {orders?.map((order, i) => (
          <Order key={`orders-${i}`} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

const useStyles = makeStyles((theme) => ({
  orders: {
    background: "#ffffff",
    boxSizing: "border-box",
    boxShadow: "0 0 32px -22px",
    padding: "40px 10%",
    position: "relative",
  },
  ordersNav: {
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
    borderRadius: "4px",
    padding: "20px",
    marginBottom: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& span": {
      cursor: "pointer",
      textDecoration: "underline",
      "&:hover": {
        color: "#febd67",
      },
      "&:active": {
        color: "#da973f",
      },
    },
  },
  ordersOrder: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));
