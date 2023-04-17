var Plotly = require('plotly.js-dist');

// Load data from separate file
var data = require('./data.js');

// Create trace for scatter plot
var trace = {
  x: data['Number_Of_Jobs'],
  y: data['Rank'],
  text: data['Language'],
  mode: 'markers',
  marker: {
    size: data['Number_Of_Jobs'],
    sizemode: 'diameter',
    sizeref: 0.05,
    color: data['Language'],
    colorscale: 'Viridis',
    opacity: 0.7,
    line: {
      color: 'white',
      width: 0.5
    }
  }
};

// Define layout and configuration options
var layout = {
  title: 'Language Popularity vs. Job Demand',
  xaxis: {
    title: 'Job Demand',
    type: 'log'
  },
  yaxis: {
    title: 'Language Popularity'
  },
  height: 600
};

var config = {
  responsive: true,
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: [
    'sendDataToCloud',
    'autoScale2d',
    'resetScale2d',
    'toggleSpikelines',
    'hoverClosestCartesian',
    'zoom2d',
    'pan2d',
    'select2d',
    'lasso2d'
  ]
};

// Create plot and bind to HTML element with ID 'language-plot'
Plotly.newPlot('language-plot', [trace], layout, config);