import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  checkoutProduct: {
    display: "flex",
    position: "relative",
    padding: ({ small }) => `12px 0 12px ${small ? "140px" : "190px"}`,
  },
  checkoutImage: {
    width: ({ small }) => (small ? "140px" : "190px"),
    marginLeft: ({ small }) => (small ? "-140px" : "-190px"),
    "& img": {
      width: ({ small }) => (small ? "130px" : "180px"),
      height: ({ small }) => (small ? "130px" : "180px"),
      objectFit: "contain",
    },
  },
  checkoutList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    lineHeight: "19px",
  },
  checkoutListTitle: {
    fontSize: "17px",
    fontWeight: "700",
    textDecoration: "none",
    color: "#0066c0",
  },
  listFontSize: {
    fontSize: "12px",
  },
  checkoutSelect: {
    display: "flex",
    height: "29px",
    width: "fit-content",
    maxWidth: "110px",
    border: "1px solid",
    borderColor: "#ADB1B8 #A2A6AC #8D9096",
    background: "linear-gradient(to bottom,#f7f8fa,#e7e9ec)",
    borderRadius: "3px",
    fontSize: "13px",
    lineHeight: "29px",
    padding: "0 10px 0 11px",
    position: "relative",
    "&:hover": {
      background: "linear-gradient(to bottom,#e5e9ef,#dbdce3)",
      borderColor: "#a2a6ac #979aa1 #82858a",
    },
    "& label": {
      "&:before": {
        flex: "1",
        content: "'數量：'",
        position: "relative",
      },
    },
    "& select": {
      flex: 1,
      cursor: "pointer",
      position: "relative",
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      "& option": {
        width: "100%",
      },
    },
  },
  checkoutDelete: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
    color: "#0066C0",
    transition: "all 0.1s linear",
    "&:hover": {
      color: "#E47911",
      textDecoration: "underline",
    },
    "&:before": {
      content: "''",
      width: "1px",
      height: "14px",
      background: "#ddd",
      display: "block",
      margin: "10px",
    },
  },
}));
