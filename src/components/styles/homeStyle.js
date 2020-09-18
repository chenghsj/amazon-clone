import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  homeContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1500px",
    padding: "0 0 20px",
  },
  homeRow: {
    display: "flex",
    zIndex: 1,
    margin: "0 10px",
  },
}));
