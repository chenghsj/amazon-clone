import React from "react";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../StateProvider";

function Checkout() {
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();

  return (
    <div className={classes.checkout}>
      <div className={classes.checkoutLeft}>
        <div>
          <h2 className={classes.checkoutTitle}>
            購物車<span>定價</span>
          </h2>
          {basket.map((item, i) => {
            return (
              <CheckoutProduct
                deletable={true}
                selectable={true}
                handleCountChange={(e, id) => {
                  dispatch({
                    type: "CHANGE_PRODUCT_COUNT",
                    item: { id, count: e.target.value },
                  });
                }}
                key={`checkout-${i}`}
                {...item}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.checkoutRight}>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;

const useStyles = makeStyles((theme) => ({
  checkout: {
    display: "flex",
    padding: "20px",
    backgroundColor: "white",
    height: "max-content",
    justifyContent: "space-between",
  },
  checkoutLeft: {
    width: "100%",
    paddingRight: "3.5%",
  },
  checkoutTitle: {
    marginBottom: 0,
    padding: "10px",
    position: "relative",
    borderBottom: "1px solid lightgray",
    "& span": {
      position: "absolute",
      fontSize: "13px",
      fontWeight: "400",
      right: 0,
      bottom: 0,
    },
  },
  checkoutRight: {
    boxSizing: "border-box",
    background: "#f3f3f3",
    border: "1px solid #ddd",
    borderRadius: "4px",
    cursor: "pointer",
    height: "fit-content",
    minWidth: "300px",
    marginBottom: "14px",
    padding: "14px 18px",
  },
}));
