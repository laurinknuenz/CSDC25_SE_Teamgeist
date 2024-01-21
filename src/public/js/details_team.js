document.addEventListener('DOMContentLoaded', () => {
    fetchTeamData();
    setupEventListeners();
});

document.getElementById('burgerMenuButton').addEventListener('click', function () {
    var menuContent = document.getElementById('burgerMenuContent');
    menuContent.style.display = menuContent.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    fetch('/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login'; // Redirect to the login page after logout
            }
        })
        .catch(error => console.error('Error:', error));
});

function fetchTeamData() {
    fetch('/api/teams/')
        .then(response => response.json())
        .then(data => {
            console.log(data.team.manager);
            displayTeamData(data.team);
            setupTeamMembers(data.team.listOfMembers);
            displayManagerInfo(data.team.manager);
        })
        .catch(error => console.error('Error fetching team data:', error));


    fetch('/api/users/')
        .then(response => response.json())
        .then(data => {
            console.log(data.manager);
            handleUserRole(data.user);
            //displayManagerInfo(data.manager);
            console.log(data.manager);
        })
        .catch(error => console.error('Error fetching user data:', error));
}

function displayTeamData(team) {
    const teamNameField = document.getElementById('team_name');
    const teamTypeField = document.getElementById('team_type');
    const inviteCodeField = document.getElementById('team_invite_code');

    teamNameField.value = team.teamname ? team.teamname : '';
    teamTypeField.value = team.typeOfSport ? team.typeOfSport : '';
    inviteCodeField.textContent = team.inviteCode ? team.inviteCode : '';
}

function setupTeamMembers(memberIds) {
    // Join the member IDs into a comma-separated string
    const memberIdsParam = memberIds.join(',');

    fetch(`/api/users/teammembers?ids=${memberIdsParam}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayTeamMembers(data.teammembers))
        .catch(error => console.error('Error fetching team members:', error));
}

function displayTeamMembers(members) {
    console.log('Team Members:', members);
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = ''; // Clear existing list
    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.className = 'player';
        memberElement.innerHTML = `
            <strong>${member.firstname} ${member.lastname}</strong>
            <button onclick="deleteUser('${member._id}')">Delete</button>
        `;
        playerList.appendChild(memberElement);
    });
}

function displayManagerInfo(manager) {
    if (manager) {
        document.getElementById('team_manager_name').textContent = `${manager.firstname} ${manager.lastname}`;
        document.getElementById('team_manager_contact').textContent = manager.email;
    } else {
        console.log('Manager information is not available.');
    }
}

function handleUserRole(user) {
    if (user.role === 'manager') {
        enableEditing();
    } else {
        disableEditing();
    }
}

function enableEditing() {
    document.getElementById('team_name').disabled = false;
    document.getElementById('team_type').disabled = false;
    document.getElementById('updateTeamButton').style.display = 'block';
    document.getElementById('deleteTeamButton').style.display = 'block';
}

function disableEditing() {
    document.getElementById('team_name').disabled = true;
    document.getElementById('team_type').disabled = true;
    document.getElementById('updateTeamButton').style.display = 'none';
    document.getElementById('deleteTeamButton').style.display = 'none';
}

function setupEventListeners() {
    document.getElementById('updateTeamButton').addEventListener('click', updateTeam);
    document.getElementById('deleteTeamButton').addEventListener('click', deleteTeam);
}

function updateTeam() {
    const updatedData = {
        teamname: document.getElementById('team_name').value,
        typeOfSport: document.getElementById('team_type').value
    };

    fetch('/api/teams/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(() => alert('Team updated successfully!'))
    .catch(error => console.error('Error updating team:', error));
}

function deleteTeam() {
    if (confirm('Are you sure you want to delete this team?')) {
        fetch('/api/teams/', { method: 'DELETE' })
            .then(() => {
                alert('Team deleted successfully!');
                window.location.href = '/'; // Redirect to a safe page
            })
            .catch(error => console.error('Error deleting team:', error));
    }
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, { method: 'DELETE' })
            .then(() => {
                alert('User deleted successfully!');
                fetchTeamData(); // Refresh team data
            })
            .catch(error => console.error('Error deleting user:', error));
    }
}