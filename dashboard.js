var time;
var close;
var volume;

function drawchart(data) {
  times = data.map(x => x.time)
  close = data.map(x => x.close)
  volume = data.map(x => x.volumeto)

  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: times,
      datasets: [{
        label: 'BTC',
        yAxisID: 'Price',
        data: close,
        borderWidth: 0,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }, {
        label: 'Volume (USD)',
        yAxisID: 'Volume',
        data: volume,
        borderWidth: 0,
        backgroundColor: 'rgba(100, 100, 255, 0.2)',
        borderColor: 'rgba(100, 100, 255, 1)',
      }]
    },
    options: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'index',
        intersect: false
      },
      elements: {
        point: {
          radius: 0
        }
      },
      scales: {
        xAxes: [{
          type: 'time',
        }],
        yAxes: [{
          id: 'Price',
          type: 'logarithmic',
          position: 'left',
          ticks: {
            max: Math.max(...close),
            min: 0
          }
        }, {
          id: 'Volume',
          type: 'logarithmic',
          position: 'right',
          ticks: {
            max: Math.max(...volume) * 1000,
            min: 0
          }
        }]
      }
    }
  }
  );
}

$.ajax({
  url: "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&allData=true&limit=100&aggregate=3&e=CCCAGG",
  context: document.body
}).done(function (data) {
  drawchart(data.Data);
  //$(".test").text(JSON.stringify(data))

});