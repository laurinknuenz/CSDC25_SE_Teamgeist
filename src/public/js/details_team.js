document.addEventListener('DOMContentLoaded', () => {
    fetchTeamData();
    setupEventListeners();
});

let allTeamMembers = [];  // This will store all team members
let userRole;
function fetchTeamData() {
    fetch('/api/teams/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayTeamData(data.team);
            setupTeamMembers(data.team.listOfMembers);
        })
        .catch(error => console.error('Error fetching team data:', error));

    fetch('/api/users/teammembers')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayManagerInfo(data.manager);
        })
        .catch(error => console.error('Error fetching user data:', error));
    fetch('/api/users/')
        .then(response => response.json())
        .then(data => {
            userRole = data.user.role;
            handleUserRole(data.user);
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
        .then(data => {
            allTeamMembers = data.teammembers; // Save the team members
            displayTeamMembers(allTeamMembers);
        })
        .catch(error => console.error('Error fetching team members:', error));
}

function searchTeamMembers(searchText) {
    const filteredMembers = allTeamMembers.filter(member =>
        member.firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        member.lastname.toLowerCase().includes(searchText.toLowerCase())
    );
    displayTeamMembers(filteredMembers);
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
        `;
        if (userRole == "manager") {
            let delButton = document.createElement("button");
            delButton.onclick = () => deleteUser(member.userId);
            delButton.innerHTML = "Delete";
            memberElement.appendChild(delButton);
        }
        playerList.appendChild(memberElement);
    });
}

function displayManagerInfo(manager) {
    if (manager) {
        document.getElementById('team_manager_name').textContent = `${manager.firstname} ${manager.lastname}`;
        document.getElementById('team_manager_contact').textContent = manager.email;
    } else {
        document.getElementById('team_manager_contact').textContent = "not available";
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
    document.getElementById('search').addEventListener('input', (event) => {
        searchTeamMembers(event.target.value);
    });
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
        fetch(`/api/users/member`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                alert('User deleted successfully!');
                fetchTeamData(); // Refresh team data
            })
            .catch(error => console.error('Error deleting user:', error));
    }
}