fetch('data.json')
		  .then(response => response.json())
		  .then(data => {
		  	// Filter and sort the data to get the top 10 programming languages based on rank
		  	let topLanguages = data.filter(d => d.Rank <= 10)
		  		.sort((a, b) => a.Rank - b.Rank);

		  	// Extract the values from the filtered data
		  	let programmingLanguages = topLanguages.map(d => d.Programming_Language);
		  	let numberOfUsers = topLanguages.map(d => d.Number_Of_Users);
		  	let numberOfJobs = topLanguages.map(d => d.Number_Of_Jobs);

		  	// Create traces for the bar chart
		  	let trace1 = {
		  		x: programmingLanguages,
		  		y: numberOfUsers,
		  		name: 'Number of Users',
		  		type: 'bar'
		  	};

		  	let trace2 = {
		  		x: programmingLanguages,
		  		y: numberOfJobs,
		  		name: 'Number of Jobs',
		  		type: 'bar'
		  	};

		  	// Create a layout for the plot
		  	let layout = {
		  		title: 'Top 10 Programming Languages',
		  		barmode: 'group'
		  	};

		  	// Plot the data using Plotly
		  	Plotly.newPlot('plot', [trace1, trace2], layout);
		  })
		  .catch(error => console.error(error));