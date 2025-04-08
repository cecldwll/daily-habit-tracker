/* js/progress.js */
const ctx = document.getElementById('progressChart').getContext('2d');
const trackData = JSON.parse(localStorage.getItem("tracking")) || {};
const habitTotals = {};
const habitCount = {};  // Track total count of habits to calculate incomplete tasks

Object.values(trackData).forEach(entries => {
  entries.forEach(entry => {
    if (!habitTotals[entry.name]) habitTotals[entry.name] = 0;
    if (!habitCount[entry.name]) habitCount[entry.name] = 0;
    habitCount[entry.name]++; // Increase habit count

    if (entry.done) {
      habitTotals[entry.name]++;
    }
  });
});

// Calculate the number of incomplete tasks for each habit
const incompleteTotals = {};
Object.keys(habitTotals).forEach(habit => {
  incompleteTotals[habit] = habitCount[habit] - habitTotals[habit];
});

// Total completed and incomplete tasks
const completedData = Object.values(habitTotals);
const incompleteData = Object.values(incompleteTotals);

// Color palette for completed tasks
const completedColors = [
  '#0f0607', '#1e0b0e', '#2d1114', '#3c161b', '#4a1c22', '#592129', '#68272f',
  '#772c36', '#86323d', '#953744', '#A03b49', '#b34251', '#bd4c5b', '#c25b69',
  '#c86a77', '#cd7984', '#d38892', '#d897a0', '#dea6ad', '#e3b5bb', '#e9c3c8',
  '#eed2d6', '#f4e1e4', '#f9f0f1'
];

// Pie chart data: Completed tasks and Incomplete tasks
const chart = new Chart(ctx, {
  type: 'pie',  // Change type to 'pie' for a pie chart
  data: {
    labels: [...Object.keys(habitTotals), 'Incomplete Tasks'],  // Labels for each segment of the pie
    datasets: [{
      label: 'Tasks Completion',  // Title of the dataset
      data: [...completedData, incompleteData.reduce((acc, val) => acc + val, 0)],  // Sum of incomplete tasks
      backgroundColor: [
        ...completedColors.slice(0, completedData.length),  // Apply gradient-like color for completed tasks
        '#e7e393'  // Always use this color for incomplete tasks
      ],
      borderColor: '#ffffff',  // White border around each slice
      borderWidth: 2,  // Border thickness
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'top',  // Position the legend on top
        labels: {
          color: '#ffffff',  // Legend text color
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
    }
  }
});