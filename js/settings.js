/* js/settings.js */
function resetData() {
    if (confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();
      alert("All data has been reset.");
      location.reload();
    }
  }