import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";

function Login() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((err) => console.log(err.message));
  };

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          console.log(history);
          history.push("/");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={classes.login}>
      <div className={classes.loginNav}>
        <Link to="/" className={classes.loginLogo}></Link>
      </div>
      <form className={classes.loginForm}>
        <h1>登入</h1>
        <div>
          <label htmlFor="login_email">電子郵件</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            id="login_email"
            type="email"
            value={email}
          />
          <label htmlFor="login_password">密碼</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="login_password"
            type="password"
            value={password}
          />
        </div>
        <div>
          <span
            onClick={singIn}
            className={`${classes.loginButton} a-button-primary`}
          >
            登入
          </span>
        </div>
        <div>
          <span
            onClick={signUp}
            className={`${classes.loginButton} ${classes.sighupButton} a-button-submit`}
          >
            建立您的Amazon帳戶
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;

const useStyles = makeStyles((theme) => ({
  login: {
    background: "#ffffff",
    boxSizing: "border-box",
    boxShadow: "0 0 32px -22px",
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  loginNav: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
    marginBottom: "18px",
  },
  loginLogo: {
    backgroundImage:
      "url(https://m.media-amazon.com/images/G/01/AUIClients/AmazonUIBaseCSS-sprite_2x-a3d92a134e6afaec4974bceac0812b73d0b635c1._V2_.png)",
    backgroundSize: "400px 750px",
    backgroundPosition: "-5px -130px",
    height: "31px",
    width: "103px",
  },
  loginForm: {
    borderRadius: "4px",
    border: "1px #ddd solid",
    boxSizing: "border-box",
    display: "block",
    width: "350px",
    margin: "0 auto",
    marginBottom: "22px",
    padding: "20px 26px",
    "& div": {
      marginBottom: "14px",
    },
    "& h1": {
      fontSize: "28px",
      fontWeight: 400,
      marginBottom: "10px",
    },
    "& label": {
      display: "flex",
      paddingLeft: "2px",
      paddingBottom: "2px",
      fontSize: "13px",
      fontWeight: "700",
    },
    "& input": {
      width: "100%",
      padding: "3px 7px",
      height: "31px",
      borderRadius: "3px",
      border: "1px solid #a6a6a6",
      boxSizing: "border-box",
      marginBottom: "6px",
    },
  },
  loginButton: {
    width: "100%",
    borderRadius: "3px",
    border: "1px solid",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    height: "29px",
  },
  sighupButton: {
    marginTop: "50px",
    position: "relative",
    "&:before": {
      display: "block",
      content: "''",
      width: "100%",
      borderTop: "1px solid #e7e7e7",
      position: "absolute",
      top: "-25px",
    },
    "&:after": {
      fontSize: "12px",
      color: "#767676",
      content: "'Amazon 的新客戶？'",
      display: "block",
      width: "fit-content",
      background: "#fff",
      position: "absolute",
      top: "-33px",
      textAlign: "center",
      padding: "0 8px 0 7px",
    },
  },
}));
