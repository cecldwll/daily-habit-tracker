/* js/tracking.js */
const form = document.getElementById("tracking-form");
const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
const date = new Date().toISOString().split("T")[0];
const savedData = JSON.parse(localStorage.getItem("tracking")) || {};
const todayData = savedData[date] || [];

// Generate habit checkboxes
storedHabits.forEach(habit => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = habit;

  // Restore checked state if already saved for today
  const tracked = todayData.find(entry => entry.name === habit);
  if (tracked && tracked.done) {
    checkbox.checked = true;
  }

  label.appendChild(checkbox);
  label.append(` ${habit}`);
  form.appendChild(label);
  form.appendChild(document.createElement("br"));
});

function saveTracking() {
  const data = JSON.parse(localStorage.getItem("tracking")) || {};
  data[date] = storedHabits.map(habit => ({
    name: habit,
    done: form.elements[habit].checked
  }));
  localStorage.setItem("tracking", JSON.stringify(data));
  alert("Progress saved!");
}