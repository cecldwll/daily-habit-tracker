/* js/main.js */
document.addEventListener("DOMContentLoaded", () => {
  const quoteEl = document.getElementById("quote");

  fetch("https://thequoteshub.com/api/random-quote")
  .then((response) => response.json())
  .then((data) => {
    const quote = data.text;
    const author = data.author;
    document.getElementById("quote").textContent = `"${quote}" — ${author}`;
  })
  .catch((error) => {
    console.error("Quote API failed:", error);
    document.getElementById("quote").textContent = "“Stay consistent — small steps every day lead to big changes.”";
  });

  const habitList = document.getElementById("habit-list");
  if (habitList) {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    fetch("data/habits.json")
      .then(res => res.json())
      .then(defaults => {
        const allHabits = [...new Set([...habits, ...defaults])];
        allHabits.forEach(habit => addHabitToList(habit));
        localStorage.setItem("habits", JSON.stringify(allHabits));
      });
    document.querySelector("button")?.addEventListener("click", () => {
      const input = document.getElementById("new-habit");
      const habit = input.value.trim();
      if (habit && !habits.includes(habit)) {
        habits.push(habit);
        localStorage.setItem("habits", JSON.stringify(habits));
        addHabitToList(habit);
      }
      input.value = "";
    });
    function addHabitToList(habit) {
      const li = document.createElement("li");
      li.textContent = habit;
      habitList.appendChild(li);
    }
  }

  const trackingForm = document.getElementById("tracking-form");
  if (trackingForm) {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits.forEach(habit => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = habit;
      label.appendChild(checkbox);
      label.append(` ${habit}`);
      trackingForm.appendChild(label);
    });
    document.querySelector("button")?.addEventListener("click", () => {
      const date = new Date().toISOString().split("T")[0];
      const data = JSON.parse(localStorage.getItem("tracking")) || {};
      data[date] = storedHabits.map(habit => ({
        name: habit,
        done: trackingForm.elements[habit].checked
      }));
      localStorage.setItem("tracking", JSON.stringify(data));
      alert("Progress saved!");
    });
  }

  const resetButton = document.querySelector("button");
  if (resetButton && resetButton.textContent.includes("Reset")) {
    resetButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all data?")) {
        localStorage.clear();
        alert("All data has been reset.");
        location.reload();
      }
    });
  }
});