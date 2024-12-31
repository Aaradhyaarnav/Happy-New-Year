// Countdown Timer Functionality
const countdownDate = new Date("January 1, 2025 00:00:00").getTime();  // Set target date (Jan 1, 2025)
const countdownElement = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date().getTime();  // Get current time
  const timeLeft = countdownDate - now;  // Time remaining

  if (timeLeft <= 0) {
    // Countdown reached zero, trigger rocket animation
    countdownElement.innerHTML = "Happy New Year!";
    startRocketAnimation();
  } else {
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;  // Display countdown
  }
}

// Function to start rocket animation
function startRocketAnimation() {
  // Create a rocket element and animate it
  const rocket = document.createElement("div");
  rocket.classList.add("rocket");
  document.body.appendChild(rocket);

  // Set the rocket's opacity after 1 second to make it visible
  setTimeout(() => {
    rocket.style.opacity = 1;
  }, 1000);
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call to update countdown immediately
updateCountdown();

// Popup Form for Resolution
function openPopup() {
  document.getElementById('popup-form').style.display = 'flex';  // Show popup form
}

function closePopup() {
  document.getElementById('popup-form').style.display = 'none';  // Close popup form
}

// Handle the resolution form submission
document.getElementById('resolution-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevent the form from submitting in the usual way

  const name = document.getElementById('name').value;  // Get name from form
  const phone = document.getElementById('phone').value || 'N/A';  // Get phone, default 'N/A' if not entered
  const resolutionText = document.getElementById('resolution-text').value;  // Get resolution text from form

  // Create an object to hold the resolution data
  const resolution = {
    name: name,
    phone: phone,
    resolutionText: resolutionText
  };

  // Get the existing resolutions from localStorage or create an empty array if none exist
  let resolutions = JSON.parse(localStorage.getItem('resolutions')) || [];

  // Add the new resolution to the array
  resolutions.push(resolution);

  // Save the updated resolutions array to localStorage
  localStorage.setItem('resolutions', JSON.stringify(resolutions));

  // Close the popup form
  closePopup();

  // Clear the form
  document.getElementById('resolution-form').reset();

  // Refresh the resolutions list
  displayResolutions();
});

// Function to display resolutions in the table
function displayResolutions() {
  const resolutions = JSON.parse(localStorage.getItem('resolutions')) || [];  // Get stored resolutions
  const resolutionList = document.getElementById('resolution-list');  // Get the table body element

  // Clear any existing content in the table
  resolutionList.innerHTML = '';

  // Loop through resolutions and add them to the table
  resolutions.forEach(function(resolution) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${resolution.name}</td>
      <td>${resolution.resolutionText}</td>
    `;
    resolutionList.appendChild(row);
  });
}

// Call the displayResolutions function when the page loads to show any saved resolutions
window.onload = function() {
  displayResolutions();
};
