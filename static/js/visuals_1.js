d3.json("data.json").then(function(jsonData) {
    // Extract the unique years from the data
    var years = [...new Set(jsonData.map(item => item.Year))];

    // Sort the years in ascending order
    years.sort(); 
        
    // Populate the dropdown with the unique years
    d3.select("#year-dropdown")
        .selectAll("option")
        .data(years)
        .enter()
        .filter(function(d) {
          // Check if the year has non-zero users and non-zero jobs
          var yearData = jsonData.filter(function(data) {
            return data.Year == d && data.Number_Of_Users > 0 && data.Number_Of_Jobs > 0;
          });
          return yearData.length > 0;
        })
        .append("option")
        .text(function(d){return d;}
    );
        
    // Define the function to update the charts when the dropdown is changed
    function updateCharts(selectedYear) {
        // Filter the data to only include the selected year, non-zero users, and non-zero jobs
        var filteredData = jsonData.filter(function(d) {
        return d.Year == selectedYear && d.Number_Of_Users > 0 && d.Number_Of_Jobs > 0;
        });

        // Extract the programming languages from the selected year without the filtered value
        var selectedYearData = jsonData.filter(function(d) {
            return d.Year == selectedYear;
        });
        var selectedYearLanguages = [...new Set(selectedYearData.map(item => item.Programming_Language))];
        var selectedYearTotalLanguages = selectedYearLanguages.length;

        // Extract the programming languages from the selected year with the filtered value
        var filteredLanguages = [...new Set(filteredData.map(item => item.Programming_Language))];
        var filteredTotalLanguages = filteredLanguages.length;
    
        // Calculate the total number of users and jobs
        var totalUsers = d3.sum(filteredData, function(d) { return d.Number_Of_Users; }).toLocaleString();
        var totalJobs = d3.sum(filteredData, function(d) { return d.Number_Of_Jobs; }).toLocaleString();

        // Sort the data by rank in descending order
        filteredData.sort(function(a, b) {
        return d3.descending(b.Rank, a.Rank);
        });
                
        // Extract the programming languages, number of users, and number of jobs
        var languages = filteredData.map(function(d) { return d.Programming_Language; });
        var users = filteredData.map(function(d) { return d.Number_Of_Users; });
        var jobs = filteredData.map(function(d) { return d.Number_Of_Jobs; });

        // Define the users chart data and layout
        var usersChartData = {
            x: languages,
            y: users,
            type: "bar",
            marker: { color: "steelblue" }
        };
        
        var usersChartLayout = {
            title: "# of Users for Language(s) Created on " + selectedYear,
            xaxis: { title: "Programming Language" },
            yaxis: { title: "# of Users" }
        };
                
        // Define the jobs chart data and layout
        var jobsChartData = {
            x: languages,
            y: jobs,
            type: "bar",
            marker: { color: "orange" }
        };
        
        var jobsChartLayout = {
            title: "# of Jobs for Language(s) Created on " + selectedYear,
            xaxis: { title: "Programming Language" },
            yaxis: { title: "# of Jobs" }
        };
        
        // Plot the charts
        Plotly.newPlot("chart-users", [usersChartData], usersChartLayout);
        Plotly.newPlot("chart-jobs", [jobsChartData], jobsChartLayout);

        // Display the # of programming languages from the selected year without the filtered value
        d3.select("#total-languages").text("Total # of Programming Languages for " + selectedYear + " (without filtered value): " + selectedYearTotalLanguages);

        // Display the # of programming languages from the selected year with the filtered value
        d3.select("#total-languages-filtered").text("Total # of Programming Languages for " + selectedYear + " (with filtered value): " + filteredTotalLanguages);
                
        // Update the total number of users and jobs
        d3.select("#total-users").text("Total # of Users: " + totalUsers);
        d3.select("#total-jobs").text("Total # of Jobs: " + totalJobs);
    }
    
    // Initialize the charts with the first year of data
    updateCharts(years[1]);
            
    // Define the function to update the charts when the dropdown is changed
    d3.select("#year-dropdown")
    .on("change", function() {
            var selectedYear = d3.select(this).property("value");
            updateCharts(selectedYear);
    });
});