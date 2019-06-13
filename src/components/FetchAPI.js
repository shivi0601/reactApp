import React, { Component } from "react";
//import fetch from "isomorphic-fetch";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./style.css";
import { tsPropertySignature } from "@babel/types";

export default class FetchAPI extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.check);
    this.state = {
      chartData: tsPropertySignature.chartData,
      name: "Sensex",
      symbol: "BSE",
      price: null,
      lastPrice: 0
    };
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  componentDidMount() {
    axios
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=NSE:TCS&interval=5min&apikey=RQAJN3LIUHLOWQZ7"
      )

      .then(res => {
        const data = res.data;
        console.log(data);
        const time = Object.keys(data["Time Series (5min)"]);
        console.log(time[0]);

        this.setState({
          price: data["Time Series (5min)"][time[0]]["1. open"],
          lastPrice: data["Time Series (5min)"][time[1]]["1. open"],

          chartData: {
            labels: [time[0], time[1], time[2], time[3], time[4], time[5]],

            datasets: [
              {
                label: "Price",
                data: [
                  data["Time Series (5min)"][time[0]]["1. open"],
                  data["Time Series (5min)"][time[1]]["1. open"],
                  data["Time Series (5min)"][time[2]]["1. open"],
                  data["Time Series (5min)"][time[3]]["1. open"],
                  data["Time Series (5min)"][time[4]]["1. open"],
                  data["Time Series (5min)"][time[5]]["1. open"]
                ],
                backgroundColor: [
                  "rgb(0, 255, 0,0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(153, 102, 255, 0.6)",
                  "rgba(255, 159, 64, 0.6)",
                  "rgba(255, 99, 132, 0.6)"
                ]
              }
            ]
          }
        });
      });
  }
  priceChange(lastPrice, price) {
    console.log("The lst price " + lastPrice);
    console.log("The price is " + price);
    const diff = price - lastPrice;
    var change = diff / lastPrice;
    change = change * 100;
    return change.toFixed(2);
  }

  render() {
    const { name, symbol, price, lastPrice } = this.state;
    const gainloss = lastPrice > price ? "loss" : "gain";

    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: "Stock Market For TCS",
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />

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
        <div />
      </div>
    );
  }
}
