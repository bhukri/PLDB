d3.json("static/data.json").then((importedData) => {
  let data = importedData;

  // Extract the programming language, rank, and number of jobs data
  var language = data.map(function(d) { return d.Programming_Language; });
  var rank = data.map(function(d) { return d.Rank; });
  var jobs = data.map(function(d) { return d.Number_Of_Jobs; });

  // Define the trace
  var trace = {
    x: rank,
    y: jobs,
    mode: 'markers',
    type: 'scatter',
    text: language,
    marker: {
      color: jobs,
      colorscale: 'Viridis',
      size: 10,
      showscale: true
    }
  };

  // Define the layout
  var layout = {
    title: 'Programming Language Jobs vs. Rank',
    xaxis: {
      title: 'Rank'
    },
    yaxis: {
      title: 'Number of Jobs'
    },
    margin: {
      t: 60,
      b: 60,
      l: 60,
      r: 60
    }
  };

  // Plot the chart
  Plotly.newPlot('plot', [trace], layout);
});