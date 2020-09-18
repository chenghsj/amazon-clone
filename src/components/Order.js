import React, { useState } from "react";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import { makeStyles } from "@material-ui/core/styles";
import CurrencyFormat from "react-currency-format";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Order({ order }) {
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.order}>
      <Accordion expanded={expanded} onChange={handleExpanded}>
        <AccordionSummary
          className={classes.accordionSummary}
          classes={{
            expanded: classes.summaryExpanded,
            expandIcon: classes.summaryExpandedIcon,
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <ul>
            <li>
              <p className={classes.orderId}>
                <strong>訂單編號：</strong>
                {order.id}
              </p>
            </li>
            <li>
              <p>
                <strong>訂單日期：</strong>
                {moment.unix(order.data.created).format("YYYY.MM.DD, hh:mmA")}
              </p>
            </li>
            <li>
              <CheckoutProduct
                hideHR={true}
                small={true}
                {...{ ...order.data.basket[0], rating: false }}
              />
            </li>
          </ul>
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          <ul>
            {order.data.basket?.map((item, i) => {
              if (i === 0) return;
              else
                return (
                  <li key={`order-${i}`}>
                    <CheckoutProduct
                      hideHR={true}
                      small={true}
                      {...{ ...item, rating: false }}
                    />
                  </li>
                );
            })}
          </ul>
          <CurrencyFormat
            value={order.data.amount / 100}
            displayType="text"
            decimalScale={3}
            thousandSeparator={true}
            prefix={"US$"}
            renderText={(value) => (
              <>
                <p style={{ marginTop: 0 }}>
                  <strong>付款金額：</strong>
                  {value}
                </p>
              </>
            )}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Order;

const useStyles = makeStyles((theme) => ({
  order: {
    marginBottom: "25px",
    "& ul": {
      margin: "13px 0 0",
      width: "95%",
      listStyle: "none",
      padding: 0,
      "& p": {
        margin: "5px 0",
      },
    },
  },
  accordionSummary: {
    // margin: "12px 0 0",
    padding: "0 25px 0 35px",
  },
  summaryExpanded: {
    margin: "0 !important",
  },
  summaryExpandedIcon: { margin: 0 },
  accordionDetails: {
    flexDirection: "column",
    padding: " 0px 62px 16px 35px",
  },
}));
