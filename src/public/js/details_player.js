// Event listeners setup on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    fetchUserData();
});

// Sets up event listeners for the page
function setupEventListeners() {
    document.getElementById("updateButton").addEventListener("click", handleUserUpdate);
}

// Fetches user data from the server
function fetchUserData() {
    fetch('/api/users/')
        .then(response => handleResponse(response, "Error fetching user data"))
        .then(data => populateUserData(data.user))
        .catch(error => console.error(error));
}

// Populates user data form fields
function populateUserData(userData) {
    document.getElementById('firstname').value = userData.firstname || '';
    document.getElementById('lastname').value = userData.lastname || '';
    document.getElementById('email').value = userData.email || '';
}

// Handles user update process
function handleUserUpdate(event) {
    event.preventDefault();

    const userData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value
    };

    updateUser(userData);
}

// Sends updated user data to the server
function updateUser(userData) {
    fetch('/api/users/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(response => handleResponse(response, "Failed to update user data"))
        .then(data => console.log('User updated successfully:', data))
        .catch(error => console.error(error));
}

// Handles HTTP response, checking for errors
function handleResponse(response, errorMessage) {
    if (!response.ok) {
        throw new Error(`${errorMessage}: ${response.statusText}`);
    }
    return response.json();
}