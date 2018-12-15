import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../css/Chart.css";

class LineChart extends Component {
  state = {
    currencies: this.props.currencies
  };

  getData = () => {
    let currencyValues = [];
    let dates = [];

    const values = this.props.currencies;
    for (let i = 0; i < values.length; i++) {
      currencyValues.push(values[i].real);
      dates.push(values[i].date);
    }

    return {
      labels: dates,
      datasets: [
        {
          label: "Cotação Euro - Fonte: https://www.neocambio.io/cotacao/euro/",
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          data: currencyValues
        }
      ]
    };
  };

  renderLoading() {
    if (this.props.loading) {
      return (
        <div>
          <div>
            <span>Por favor, aguarde. Isso pode demorar um pouco.</span>
          </div>
          <span>Carregando...</span>
        </div>
      );
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="chart">
        <div>{this.renderLoading()}</div>
        <Line data={this.getData()} />
      </div>
    );
  }
}

export default LineChart;
