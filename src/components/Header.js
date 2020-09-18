/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useStyles } from "./styles/headerStyle";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { getProductCount } from "../reducer";
import { auth } from "../firebase";

function Header() {
  const [{ basket, user }] = useStateValue();
  const history = useHistory();
  const styleProps = { productCount: getProductCount(basket) };
  const classes = useStyles(styleProps);

  const handleAuth = () => {
    if (user) {
      auth.signOut();
      history.replace("/login");
    }
  };

  return (
    <div className={classes.nav}>
      <div className={classes.navLeft}>
        <IconButton className={classes.menuIcon}>
          <a href="#" className={classes.menuSprite}></a>
        </IconButton>
        <div className={classes.navLogoContainer}>
          <Link className={classes.navLogoHover} to="/">
            <span className={classes.navLogo}></span>
          </Link>
        </div>
      </div>
      <form className={classes.navSearch}>
        <input
          type="search"
          className={classes.navSearchInput}
          placeholder="search is not functional"
        />
        <button className={classes.navSearchSubmit}></button>
      </form>
      <div className={classes.navRight}>
        <Link
          to={!user && "/login"}
          className={`${classes.navRightItem} ${classes.navRightItemHover}`}
          onClick={handleAuth}
        >
          <span className={classes.navRightItemLineOne}>
            {user ? user.email : "您好，訪客"}
          </span>
          <span className={classes.navRightItemLineTwo}>
            {/* 帳戶與清單 */}
            {user ? "登出" : "登入"}
            {/* <ArrowDropDownIcon style={{ width: "20px", color: "#a7abb1" }} /> */}
          </span>
        </Link>

        <Link
          className={`${classes.navRightItem} ${classes.navRightItemHover}`}
          to="/orders"
        >
          <span className={classes.navRightItemLineOne}>提貨</span>
          <span className={classes.navRightItemLineTwo}>
            與訂單&nbsp;&nbsp;
          </span>
        </Link>
        <Link
          to="/checkout"
          className={`${classes.navRightItemCart} ${classes.navRightItemHover}`}
          href="#"
        >
          <span className={classes.navRightItemCartCount} style={{}}>
            {getProductCount(basket)}
          </span>
          <span className={classes.navRightItemCartIcon}></span>
          <span
            className={classes.navRightItemLineTwo}
            style={{ position: "relative", top: "9px" }}
          >
            購物車&emsp;
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
