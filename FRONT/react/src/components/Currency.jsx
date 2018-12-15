import React, { Component } from "react";
import axios from "axios";
import LineChart from "./LineChart";
import "../css/Currency.css";
import "../utils/Util";
import helpers from "../utils/Util";

class Currency extends Component {
  state = {
    beginDate: "",
    endDate: "",
    currencies: [],
    isLoading: false
  };

  getCurrencies = e => {
    e.preventDefault();
    this.setState({ isLoading: true });

    let begin = helpers.getStringDate(this.state.beginDate);
    let end = helpers.getStringDate(this.state.endDate);

    axios
      .get("http://localhost:5000/" + begin + "/" + end)
      .then(response => {
        this.setState({ currencies: response.data });
        this.setState({ isLoading: false });
      })
      .catch(e => {
        this.setState({ isLoading: false });
      });
  };

  handleBeginDateChange = e => {
    let date = new Date(e.target.value);
    let now = new Date();
    if (date < now) {
      this.setState({ beginDate: e.target.value });
    }
  };

  handleEndDateChange = e => {
    let date = new Date(e.target.value);
    let now = new Date();
    if (date < now) {
      this.setState({ endDate: e.target.value });
    }
  };

  render() {
    return (
      <div className="text-center">
        <h1 className="bg-primary text-center title">WEB Crawler</h1>
        <form>
          <div>
            <span>Data inicial: </span>
            <input
              onChange={this.handleBeginDateChange}
              value={this.state.beginDate}
              className="inputDate"
              type={"date"}
              required
            />
            <span>Data final: </span>
            <input
              onChange={this.handleEndDateChange}
              value={this.state.endDate}
              className="inputDate"
              type={"date"}
              required
            />
          </div>
          <button
            onClick={this.getCurrencies}
            className="btn btn-secondary btn-sm"
          >
            ENVIAR
          </button>
        </form>

        <LineChart
          loading={this.state.isLoading}
          currencies={this.state.currencies}
        />
      </div>
    );
  }
}

export default Currency;
