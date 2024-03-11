var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
      [22, 28, 30, 33, 35, 38, 37, 36, 34, 29, 24, 24]
    ]
  };
  
  var options = {
      axisY: {
      onlyInteger: true
    },
    seriesBarDistance: 100
  };
  
  new Chartist.Line('.ct-chart', data, options);
  