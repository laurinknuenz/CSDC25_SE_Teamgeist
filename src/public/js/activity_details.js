let activityId;

document.addEventListener('DOMContentLoaded', () => {
    activityId = new URLSearchParams(window.location.search).get('activityId');
    fetchActivityData();
    setupEventListeners();
});

function fetchActivityData() {
    let subject = document.getElementById("betreff");
    let activityType = document.getElementById("aktivitat");
    let dateAndTime = document.getElementById("datum");
    let location = document.getElementById("ort");

    fetch("/api/teams/activities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            activityId: activityId
        })
    })
        .then(response => response.json())
        .then(response => {
            const activity = response.activity;
            console.log(activity);
            subject.innerHTML = activity.subject;
            activityType.innerHTML = activity.type;
            dateAndTime.innerHTML = new Date(activity.date).toLocaleDateString("de-DE", { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
            location.innerHTML = (activity.location);
        }).catch(error => console.error('Error fetching activity data:', error));
}

function setupEventListeners() {
    document.getElementById("accept_btn").onclick = () => {
        fetch("/api/teams/activities", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activityId: activityId,
                attendance: true
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.error('Error fetching activity data:', error));
    }
    document.getElementById("decline_btn").onclick = () => {
        fetch("/api/teams/activities", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                activityId: activityId,
                attendance: false
            })
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(error => console.error('Error fetching activity data:', error));
    }
    document.getElementById("back_btn").onclick = () => {
        window.location.href = "/dashboard";
    }
}