import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useStyles } from "./styles/checkoutProductStyle";
import { useStateValue } from "../StateProvider";
//react-flip-move
function CheckoutProduct(props) {
  const {
    image,
    title,
    price,
    rating,
    id,
    count,
    small,
    handleCountChange,
    selectable,
    deletable,
    hideHR,
  } = props;
  const [productCount, setProductCount] = useState(0);
  const [{}, dispatch] = useStateValue();
  const styleProps = { small };
  const classes = useStyles(styleProps);

  useEffect(() => {
    setProductCount(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFromBasket = () => {
    dispatch({ type: "REMOVE_FROM_BASKET", item: { id } });
  };
  const changeProductCount = (e) => {
    handleCountChange(e, id);
    setProductCount(e.target.value);
  };

  return (
    <>
      <div className={classes.checkoutProduct}>
        <div className={classes.checkoutImage}>
          <img src={image} alt="product" />
        </div>
        <div style={{ width: "82.948%" }}>
          <ul className={classes.checkoutList}>
            <a className={classes.checkoutListTitle} href="#">
              <li>{title}</li>
            </a>
            {rating && (
              <li className={`${classes.listFontSize}`}>
                {Array(rating)
                  .fill()
                  .map((_, i) => (
                    <span aria-label="rating" role="img" key={i}>
                      ⭐️
                    </span>
                  ))}
              </li>
            )}
          </ul>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "4px" }}
          >
            {selectable ? (
              <div className={classes.checkoutSelect}>
                <label htmlFor="#"></label>
                <select onChange={changeProductCount} value={productCount}>
                  {Array(10)
                    .fill()
                    .map((_, i) => (
                      <option key={`selected-${i}`} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>
              </div>
            ) : (
              <p>數量：{productCount}</p>
            )}
            {deletable && (
              <span
                className={`${classes.listFontSize} ${classes.checkoutDelete}`}
                onClick={removeFromBasket}
              >
                刪除
              </span>
            )}
          </div>
        </div>
        <CurrencyFormat
          value={price}
          displayType="text"
          decimalScale={3}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <span style={{ marginLeft: "auto" }}>
              <strong>{value}</strong>
            </span>
          )}
        />
      </div>
      {hideHR || <hr />}
    </>
  );
}

export default CheckoutProduct;
