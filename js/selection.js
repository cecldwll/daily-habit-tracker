/* js/selection.js */
const habitList = document.getElementById("habit-list");
const habits = JSON.parse(localStorage.getItem("habits")) || [];
fetch("data/habits.json")
  .then(res => res.json())
  .then(defaults => {
    const allHabits = [...new Set([...habits, ...defaults])];
    allHabits.forEach(habit => addHabitToList(habit));
    localStorage.setItem("habits", JSON.stringify(allHabits));
  });
function addHabit() {
  const input = document.getElementById("new-habit");
  const habit = input.value.trim();
  if (habit && !habits.includes(habit)) {
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    addHabitToList(habit);
  }
  input.value = "";
}
function addHabitToList(habit) {
  const li = document.createElement("li");
  li.textContent = habit;
  habitList.appendChild(li);
}