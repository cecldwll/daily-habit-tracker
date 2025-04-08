/* js/tracking.js */
const form = document.getElementById("tracking-form");
const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
storedHabits.forEach(habit => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = habit;
  label.appendChild(checkbox);
  label.append(` ${habit}`);
  form.appendChild(label);
  form.appendChild(document.createElement("br"));
});
function saveTracking() {
  const date = new Date().toISOString().split("T")[0];
  const data = JSON.parse(localStorage.getItem("tracking")) || {};
  data[date] = storedHabits.map(habit => ({
    name: habit,
    done: form.elements[habit].checked
  }));
  localStorage.setItem("tracking", JSON.stringify(data));
  alert("Progress saved!");
}