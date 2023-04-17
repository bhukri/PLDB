var data = JSON.parse(JSON.stringify(data));

// create arrays for the x and y data
var xData = data.map(function (item) { return item.Number_Of_Jobs; });
var yData = data.map(function (item) { return item.Rank; });

// create an array for the text labels
var textLabels = data.map(function (item) { return item.Programming_Language; });

// create the trace for the scatter plot
var trace1 = {
  x: xData,
  y: yData,
  mode: 'markers+text',
  text: textLabels,
  textposition: 'bottom center',
  marker: {
    size: 12,
    color: 'rgb(0, 153, 255)'
  }
};

// create the layout for the plot
var layout = {
  title: 'Language Popularity vs Job Demand',
  xaxis: {
    title: 'Popularity'
  },
  yaxis: {
    title: 'Job Demand'
  }
};

// create the plot using Plotly.js
Plotly.newPlot('plot', [trace1], layout);

