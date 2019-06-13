import React, { Component } from "react";
import fetch from "isomorphic-fetch";
import "./style.css";

export default class FetchAPI2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      symbol: props.symbol,

      price: null,
      lastPrice: 0
    };

    this.pollPrice = this.pollPrice.bind(this);
  }

  componentDidMount() {
    this.pollPrice();
    setInterval(this.pollPrice, 300000);
  }

  pollPrice() {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=BSE:TCS&interval=5min&apikey=RQAJN3LIUHLOWQZ7"
    )
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        var firstKey = Object.keys(json["Time Series (5min)"])[0];
        console.log(firstKey);

        this.setState(prevState => ({
          price: json["Time Series (5min)"][firstKey]["1. open"],
          lastPrice: prevState.price
        }));
      });
  }
  priceChange(lastPrice, price) {
    console.log("The lst price " + lastPrice);
    console.log("The price is " + price);
    const diff = price - lastPrice;
    const change = diff / lastPrice;
    return change * 100;
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state;
    const gainloss = lastPrice > price ? "loss" : "gain";
    return (
      <div className={"card ${gainloss}"}>
        <div className={"name"}>
          {name}
          <span> ({symbol}) </span>
        </div>

        <div className={`percentage ${gainloss}`}>
          {this.priceChange(lastPrice, price)}%
        </div>
        <div className="price"> {price}</div>
      </div>
    );
  }
}
