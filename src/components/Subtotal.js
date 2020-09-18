import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal, getProductCount } from "../reducer";

function Subtotal() {
  const history = useHistory();
  const classes = useStyles();
  const [{ basket }, dispatch] = useStateValue();
  const [state, setState] = useState({
    count: 0,
    total: 0,
  });
  useEffect(() => {
    setState({
      count: getProductCount(basket),
      total: getBasketTotal(basket),
    });
  }, [basket, dispatch]);

  return (
    <div className={classes.subtotal}>
      <CurrencyFormat
        value={state.total}
        displayType="text"
        decimalScale={3}
        thousandSeparator={true}
        prefix={"US$"}
        renderText={(value) => (
          <p>
            小計（{state.count} 項目）: <strong>{value}</strong>
          </p>
        )}
      />
      <button
        onClick={() => history.push("/payment")}
        className="a-button-primary"
      >
        前往結帳
      </button>
    </div>
  );
}

export default Subtotal;

const useStyles = makeStyles((theme) => ({
  subtotal: {
    "& p": {
      fontSize: "17px",
      margin: "0 0 8px",
    },
    "& button": {
      width: "100%",
      height: "29px",
      border: "1px solid",
      borderRadius: "3px",
      outline: "none",
    },
  },
  checkoutBox: {
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    "& span": {
      paddingLeft: "5px",
    },
  },
}));
