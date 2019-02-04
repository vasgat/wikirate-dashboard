import {Chart} from 'chart.js';
import * as $ from 'jquery';

export class ChartService {

  polarChart(chart_id: string, labels, data: number[]) {
    const chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(231,233,237)'
    };
    const color = Chart.helpers.color;
    const config = {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: [
            color(chartColors.red).alpha(0.7).rgbString(),
            color(chartColors.orange).alpha(0.7).rgbString(),
            color(chartColors.yellow).alpha(0.7).rgbString(),
            color(chartColors.green).alpha(0.7).rgbString(),
            color(chartColors.blue).alpha(0.7).rgbString(),
            color(chartColors.purple).alpha(0.7).rgbString()
          ]
        }],
        labels: labels
      },
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },
        animation: {
          animateRotate: true,
          animateScale: true
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, dt) {
              return ' ' + dt['datasets'][0]['data'][tooltipItem['index']] + ' %';
            }
          }
        }
      }
    };

    return new Chart(chart_id, config);
  }

  radarChart(chart_id: string, labels, data: number[], company: string) {
    return new Chart(chart_id, {
      // The type of chart we want to create
      type: 'radar',
      // The data for our dataset
      data: {
        labels: ['Governance',
          'Human Rights',
          'Environment',
          'Financial',
          'Supply Chain Transparency'],
        datasets: [{
          label: company,
          backgroundColor: 'rgb(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          data: data,
        }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false
        },
        animation: {
          duration: 1000
        }
      }
    });
  }

  donutChart(chart_id: string, data_labels, data: number[]) {
    const value = data[data.length - 1];

    return new Chart(chart_id, {
      // The type of chart we want to create
      type: 'doughnut',
      // The data for our dataset
      data: {
        labels: ['women', 'men'],
        datasets: [{
          backgroundColor: [
            'rgb(102,0,153, 0.9)',
            'rgb(191,191,191, 0.9)'],
          data: [value, 100 - value],
        }]
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: {
          position: 'right',
        },
        animation: {
          duration: 1000,
          animateScale: true,
          animateRotate: true
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, dt) {
              return dt['datasets'][0]['data'][tooltipItem['index']] + ' %';
            }
          }
        }
      }
    });
  }

  lineChart(chart_id: string, data_labels, data: number[], company: string) {
    return new Chart(chart_id, {
      // The type of chart we want to create
      type: 'line',
      // The data for our dataset
      data: {
        labels: data_labels,
        datasets: [{
          label: company,
          backgroundColor: 'rgb(167,223,220, 0.5)',
          borderColor: 'rgb(167,223,220)',
          data: data,
        }]
      },
      showTooltips: true,
      // Configuration options go here
      options: {
        spanGaps: true,
        animation: {
          duration: 1000
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (labelValue, index, labels) {
                  const ABSValue = Math.abs(Number(labelValue));
                  const sign = Number(labelValue) > 0 ? '' : '-';

                  return ABSValue >= 1.0e+12

                    ? sign + (ABSValue / 1.0e+12).toFixed(2) + 'T'

                    : ABSValue >= 1.0e+9

                      ? sign + (ABSValue / 1.0e+9).toFixed(1) + 'B'

                      : ABSValue >= 1.0e+6

                        ? sign + (ABSValue / 1.0e+6).toFixed(1) + 'M'

                        : ABSValue >= 1.0e+3

                          ? sign + (ABSValue / 1.0e+3).toFixed(1) + 'K'

                          : labelValue === 'Unknown' ?

                            labelValue

                            : Number(labelValue).toFixed(2);
                }
              }
            }
          ]
        }
      }
    });
  }
}
