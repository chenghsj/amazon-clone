import { makeStyles } from "@material-ui/core/styles";

const iconURL =
  "https://images-na.ssl-images-amazon.com/images/G/01/gno/sprites/nav-sprite-global_bluebeacon-2x_optimized_layout1._CB468670774_.png";

const navSprite = {
  backgroundImage: `url(${iconURL})`,
  backgroundSize: "350px",
};

export const useStyles = makeStyles((theme) => ({
  nav: {
    minWidth: "1000px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#121a23",
    position: "sticky",
    top: 0,
    zIndex: 100,
    fontSize: "14px",
  },
  navLeft: {
    display: "flex",
    flex: 0,
  },
  navLogoContainer: {
    width: "165px",
    paddingTop: "5px",
    paddingRight: "4px",
  },
  navLogoHover: {
    height: "50px",
    display: "flex",
    "&:hover": {
      border: "1px solid white",
      borderRadius: "4px",
      margin: "-1px",
      boxSizing: "content-box",
    },
  },
  navLogo: {
    width: "97px",
    height: "30px",
    marginTop: "10px",
    backgroundPosition: "-10px -50px",
    ...navSprite,
  },
  menuIcon: {
    width: "38px",
    height: "40px",
    color: "white",
    border: "1px solid #666",
    borderRadius: "3px",
    margin: "10px 7px",
    padding: "10px 8px",
    "&:hover": {
      border: "1px solid white",
    },
  },
  menuSprite: {
    width: "20px",
    height: "18px",
    backgroundPosition: "-136px -255px",
    position: "relative",
    ...navSprite,
  },
  navSearch: {
    padding: "10px 0",
    height: "40px",
    display: "flex",
    justifyContent: "stretch",
    flex: 1,
  },
  navSearchInput: {
    padding: "0 10px",
    minWidth: "340px",
    width: "80%",
    height: "100%",
    border: "none",
    borderRadius: "4px 0 0 4px",
    outlineColor: "#f90",
  },
  navSearchSubmit: {
    ...navSprite,
    backgroundPosition: "2px -281px",
    backgroundColor: "#febd69",
    width: "45px",
    height: "100%",
    border: "none",
    outlineColor: "#f90",
    borderRadius: "0 4px 4px 0",
    color: "#111",
    "&:hover": {
      backgroundColor: "#f3a847",
    },
  },
  navRight: {
    minWidth: "283px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    margin: "2px 2px",
    padding: "3px 0 0",
    boxSizing: "border-box",
  },
  navRightItem: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textDecoration: "none",
    padding: "0 6px 0 9px",
    color: "white",
    margin: " 0 2px",
  },
  navRightItemLineOne: {
    paddingTop: "3px",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "14px",
    color: "#ccc",
  },
  navRightItemLineTwo: {
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
  },
  navRightItemCart: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    textDecoration: "none",
    paddingRight: "9px",
    color: "white",
    margin: " 0 2px",
    position: "relative",
  },
  navRightItemCartIcon: {
    position: "relative",
    width: "38px",
    height: "26px",
    backgroundPosition: "-10px -340px",
    ...navSprite,
  },
  navRightItemCartCount: {
    position: "relative",
    left: ({ productCount }) => (productCount >= 10 ? "32px" : "28px"),
    bottom: "10px",
    fontWeight: 700,
    fontSize: ({ productCount }) => (productCount < 10 ? "14px" : "16px"),
    color: "#f08804",
  },
  navRightItemHover: {
    "&:hover": {
      border: "1px solid white",
      borderRadius: "4px",
      margin: "1px",
      boxSizing: "content-box",
    },
  },
}));
