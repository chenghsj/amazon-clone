import React from "react";
import { useStyles } from "./styles/homeStyle";
import { styled } from "@material-ui/core/styles";
import { productList } from "../productList";
import Product from "./Product";

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.home}>
      <div className={classes.homeContainer}>
        <HomeImage src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Sports_zh_TW_2x._CB431860477_.jpg" />
        <div className={classes.homeRow}>
          <Product {...productList[0]} />
          <Product {...productList[1]} />
          <Product {...productList[2]} />
        </div>
        <div className={classes.homeRow}>
          <Product {...productList[3]} />
        </div>
      </div>
    </div>
  );
}

export default Home;

const HomeImage = styled("img")({
  width: "100%",
  marginBottom: "-150px",
  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1),rgba(0,0,0,0) );",
  zIndex: -1,
});
