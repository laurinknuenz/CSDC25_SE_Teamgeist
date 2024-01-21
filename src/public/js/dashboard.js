// When the DOM is fully loaded, fetch activities and set up event listeners.
document.addEventListener('DOMContentLoaded', () => {
    fetchActivities();
    setupEventListeners();
});

fetch('/api/users', {
    method: 'GET'
})
    .then(response => response.json())
    .then(data => {
        if (data.user) {
            document.getElementById('userGreeting').textContent = `Hallo ${data.user.firstname}, deine Aktivitäten.`;
        }
    })
    .catch(error => console.error('Error:', error));

// Fetches activities from the server and displays them.
function fetchActivities() {
    fetch('/api/teams/activities/all/')
        .then(response => response.json())
        .then(data => displayActivities(data.activities))
        .catch(error => console.error('Error fetching activities:', error));
}

// Displays each activity in the activity section of the dashboard.
function displayActivities(activities) {
    const activitySection = document.getElementById('activitySection');
    activitySection.innerHTML = ''; // Clear existing content before adding new activities

    activities.forEach(activity => {
        // Create a new div for each activity and fill it with activity data
        const activityElement = document.createElement('div');
        activityElement.className = 'dashboard_element';
        activityElement.innerHTML = `
            <h3>${activity.subject}</h3>
            <strong>${activity.type} - Endergebnis: __:__</strong>
            <div class="todos">
              <div class="todo_row"><strong>Wann</strong><span>-</span><strong>${formatDate(activity.date)}</strong></div>
              <div class="todo_row"><strong>Wo</strong><span>-</span><strong>${activity.location}</strong></div>
            </div>
            <div class="dashboard_btns">
              <button class="btn" onclick="changeAttendance('${activity._id}', true)">Zusagen</button>
              <button class="btn" onclick="changeAttendance('${activity._id}', false)">Absagen</button>
            </div>
        `;

        // Add event listener to each activity element for redirection to details page
        activityElement.addEventListener('click', () => redirectToActivityDetails(activity._id));
        activitySection.appendChild(activityElement);
    });
}

// Changes the attendance status of the current user for an activity.
function changeAttendance(activityId, attendance) {
    fetch('/api/teams/activities/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activityId, attendance })
    })
        .then(response => response.json())
        .then(() => {
            alert('Attendance updated successfully!');
            fetchActivities(); // Refresh the list of activities to reflect changes
        })
        .catch(error => console.error('Error updating attendance:', error));
}

// Redirects to the activity details page.
function redirectToActivityDetails(activityId) {
    window.location.href = `/activityDetails?activityId=${activityId}`;
}

// Sets up event listeners for various interactive elements.
function setupEventListeners() {
    // Event listener for the "Create Activity" button
    document.getElementById('createActivity').addEventListener('click', () => {
        window.location.href = '/activityCreation';
    });
}

// Formats a date string into a more readable format.
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ', ' + date.toLocaleTimeString();
}