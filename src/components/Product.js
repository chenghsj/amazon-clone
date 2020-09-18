import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "../StateProvider";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  const classes = useStyles();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: { id, title, image, price, rating },
    });
  };

  return (
    <div className={classes.product}>
      <div className={classes.productInfo}>
        <p>{title}</p>
        <p className={classes.productPrice}>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className={classes.productRating}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <span aria-label="rating" role="img" key={i}>
                ⭐️
              </span>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button className="a-button-primary" onClick={addToBasket}>
        新增到購物車
      </button>
    </div>
  );
}

export default Product;

const useStyles = makeStyles((theme) => ({
  product: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    margin: "10px",
    padding: "20px",
    maxHeight: "400px",
    minWidth: "100px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);",
    zIndex: 1,
    "& img": {
      maxWidth: "200px",
      maxHeight: "200px",
      width: "100%",
      objectFit: "contain",
      marginBottom: "15px",
    },
    "& button": {
      background: "#febd69",
      border: "1px solid",
      marginTop: "10px",
      borderColor: "#a88734 #9c7e31 #846a29",
      color: "#111",
    },
  },
  productInfo: {
    marginBottom: "15px",
  },
  productPrice: {
    margin: 0,
  },
  productRating: {
    display: "flex",
  },
}));
