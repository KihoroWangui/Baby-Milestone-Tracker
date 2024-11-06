const form = document.getElementById("milestoneForm");
const milestoneList = document.getElementById("milestoneList");

// Function to fetch milestones
const fetchMilestones = async () => {
  const response = await fetch("/api/milestones");
  const milestones = await response.json();
  milestoneList.innerHTML = "";
  milestones.forEach((milestone) => {
    const li = document.createElement("li");
    li.textContent = `${milestone.title} - ${new Date(
      milestone.date
    ).toLocaleDateString()}`;
    milestoneList.appendChild(li);
  });
};

// Add event listener for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  // Add milestone
  await fetch("/api/milestones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, date }),
  });

  // Clear form and fetch milestones
  form.reset();
  fetchMilestones();
});

// Fetch milestones on load
fetchMilestones();
