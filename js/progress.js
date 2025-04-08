/* js/progress.js */
const ctx = document.getElementById('progressChart').getContext('2d');
const trackData = JSON.parse(localStorage.getItem("tracking")) || {};
const habitTotals = {};

Object.values(trackData).forEach(entries => {
  entries.forEach(entry => {
    if (!habitTotals[entry.name]) habitTotals[entry.name] = 0;
    if (entry.done) habitTotals[entry.name]++;
  });
});

const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(habitTotals),
    datasets: [{
      label: 'Times Completed',
      data: Object.values(habitTotals),
      backgroundColor: '#A03B49',
      borderColor: '#722430',         // Adds a border color to bars
      borderWidth: 1,                 // Border thickness
    }]
  },
  options: {
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',           // Legend text color
          font: {
            size: 14,
            family: 'Arial',
          }
        }
      },
      tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        backgroundColor: '#333333',
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff',           // X-axis labels
          font: {
            size: 12
          }
        },
        grid: {
          color: '#444444',           // X-axis gridlines
        }
      },
      y: {
        ticks: {
          color: '#ffffff',           // Y-axis numbers
          font: {
            size: 12
          }
        },
        grid: {
          color: '#444444',           // Y-axis gridlines
        },
        beginAtZero: true
      }
    }
  }
});
