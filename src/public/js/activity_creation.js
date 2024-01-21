document.getElementById("cancel_btn").onclick = () => { location.href = "/dashboard" };
document.getElementById("save_btn").onclick = saveActivity;

function saveActivity() {
    const subject = document.getElementById("betreff").value;
    const activityType = document.getElementById("aktivitat").value;
    const dateAndTime = document.getElementById("datum").value;
    const location = document.getElementById("ort").value;

    let activity = {
        subject: subject,
        type: activityType,
        date: dateAndTime,
        location: location
    };

    fetch("/api/teams/activities/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activity)
    })
        .then(response => {
            console.log(response)
            document.getElementById("betreff").value = "";
            document.getElementById("aktivitat").value = "";
            document.getElementById("datum").value = "";
            document.getElementById("ort").value = "";
        })
        .catch(error => console.error('Error adding activity:', error));
}