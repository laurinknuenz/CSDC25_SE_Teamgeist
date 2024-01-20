// DOMContentLoaded ensures the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeUserDetails();
});

// Initializes user details by fetching data and setting up event listeners
function initializeUserDetails() {
    fetchUserData();
    document.getElementById("updateButton").addEventListener("click", handleUserUpdate);
}

// Fetches user data from the server
function fetchUserData() {
    fetch('/api/users/')
        .then(handleResponse)
        .then(data => populateUserData(data.user))
        .catch(error => console.error('Error fetching user data:', error));
}

// Handles the server response, checking for errors
function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Server responded with an error: ' + response.statusText);
    }
    return response.json();
}

// Populates the user data form fields
function populateUserData(userData) {
    document.getElementById('firstname').value = userData.firstname || '';
    document.getElementById('lastname').value = userData.lastname || '';
    document.getElementById('email').value = userData.email || '';
}

// Handles user data update
function handleUserUpdate(event) {
    event.preventDefault();

    const updatedUserData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        email: document.getElementById('email').value
    };

    updateUser(updatedUserData);
}

// Sends the updated user data to the server
function updateUser(userData) {
    fetch('/api/users/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
        .then(handleResponse)
        .then(data => console.log('User updated successfully:', data))
        .catch(error => console.error('Error updating user:', error));
}