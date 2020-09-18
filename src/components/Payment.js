import React, { useState, useEffect } from "react";
import axios from "../axios";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "../reducer";
import { db } from "../firebase";

function Payment() {
  const classes = useStyles();
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const [address, setAddress] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    //generate the stripe secret which allows us to charge customer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // stripe expects the total in a currencies subunits
        // the subunits of US dollars is cent
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("the secret is:", clientSecret);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmations
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket,
            address,
            amount: paymentIntent.amount,
            created: paymentIntent.created, //timestamp
          });

        setSucceeded(true);
        setError(null);
        setAddress("");
        setProcessing(false);
        dispatch({ type: "EMPTY_BASKET" });
        history.replace("/orders");
      });
  };

  const handlePaymentChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className={classes.payment}>
      <div className={classes.paymentContainer}>
        <div className={classes.loginNav}>
          <Link to="/" className={classes.loginLogo}></Link>
        </div>
        <div className={classes.paymentInfo}>
          <h3>訂購商品</h3>
          <span className={classes.sellingPrice}>定價</span>
          <div>
            <hr style={{ marginBottom: 0 }} />
            {basket.map((item, i) => (
              <CheckoutProduct
                handleCountChange={(e, id) => {
                  dispatch({
                    type: "CHANGE_PRODUCT_COUNT",
                    item: { id, count: e.target.value },
                  });
                }}
                small={true}
                key={`payment-${i}`}
                {...item}
              />
            ))}
          </div>
          <h3>送貨地址</h3>
          <div className={classes.paymentAddress}>
            <ul>
              <li>
                <p>
                  <b>{user?.email}</b>
                </p>
              </li>
              <li>
                {!confirmAddress ? (
                  <>
                    <TextareaAutosize
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      aria-label="fill address"
                      placeholder="輸入送貨地址..."
                    />
                    <button
                      className="a-button-submit"
                      onClick={() => setConfirmAddress(!confirmAddress)}
                    >
                      確認
                    </button>
                  </>
                ) : (
                  <>
                    <p>{address}</p>
                    <p style={{ color: "red" }}>
                      {!address && "請輸入送貨地址"}
                    </p>
                    <button
                      className="a-button-submit"
                      onClick={() => setConfirmAddress(!confirmAddress)}
                    >
                      修改
                    </button>
                  </>
                )}
              </li>
            </ul>
            {/* <span className={`a-button-primary`}>
                <a href="#">運送到此地址</a>
              </span> */}
          </div>
        </div>
        <hr />
        <div className={classes.paymentForm}>
          <form>
            <h3>付款方式</h3>
            <CardElement onChange={handlePaymentChange} />
          </form>
          {error && <div>{error}</div>}
        </div>
        <hr />
        <div className={classes.paymentPrice}>
          <CurrencyFormat
            value={getBasketTotal(basket)}
            displayType="text"
            decimalScale={3}
            thousandSeparator={true}
            prefix={"US$"}
            renderText={(value) => <h3>付款金額： {value}</h3>}
          />
        </div>
        <div className={classes.paymentConfirm}>
          <button
            onClick={handlePaymentSubmit}
            disabled={processing || disabled || succeeded || !address}
            className={
              processing ||
              disabled ||
              succeeded ||
              !address ||
              `a-button-primary`
            }
          >
            <span>
              {processing ? <p style={{ margin: 0 }}>付款中</p> : "確認付款"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;

const useStyles = makeStyles((theme) => ({
  payment: {
    display: "flex",
    justifyContent: "center",
    background: "#ffffff",
    boxSizing: "border-box",
    boxShadow: "0 0 32px -22px",
    padding: "20px 24px",
    "& h3": {
      marginBottom: "22px",
    },
  },
  paymentContainer: {
    width: "80%",
  },
  loginNav: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
  },
  loginLogo: {
    backgroundImage:
      "url(https://m.media-amazon.com/images/G/01/AUIClients/AmazonUIBaseCSS-sprite_2x-a3d92a134e6afaec4974bceac0812b73d0b635c1._V2_.png)",
    backgroundSize: "400px 750px",
    backgroundPosition: "-5px -130px",
    height: "31px",
    width: "103px",
  },
  paymentInfo: {
    marginTop: "20px",
    marginBottom: "14px",
    position: "relative",
    "& h1": {
      fontSize: "28px",
      lineHeight: 1.2,
      fontWeight: 400,
    },
  },
  sellingPrice: {
    position: "absolute",
    fontSize: "13px",
    fontWeight: "400",
    right: 0,
    top: "20px",
  },
  paymentAddress: {
    width: "20%",
    display: "flex",
    flexDirection: "column",
    "& ul": {
      margin: 0,
      listStyle: "none",
      padding: 0,
      "& button": {
        display: "block",
        outline: "none",
        border: "1px solid",
        borderRadius: "3px",
        marginTop: "13px",
      },
    },
    "& b": {
      fontSize: "16px",
      lineHeight: "22px",
    },
    "& span": {
      textAlign: "center",
      borderRadius: "3px",
      lineHeight: "29px",
      marginBottom: " 18px",
      cursor: "pointer",
      "&:hover": {
        background: "#f0c14b",
      },
      "& a": {
        outline: "none",
        textDecoration: "none",
        color: "#111",
      },
    },
  },
  paymentForm: {
    width: "50%",
    marginBottom: "14px",
    "& form": {
      marginBottom: "22px",
    },
  },
  paymentPrice: {
    marginTop: "22px",
  },
  paymentConfirm: {
    display: "flex",
    justifyContent: "center",
    margin: "40px 0 20px",
    "& button": {
      width: "100px",
      height: "29px",
    },
  },
}));
