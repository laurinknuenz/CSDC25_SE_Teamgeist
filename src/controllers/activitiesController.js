import ShortUniqueId from "short-unique-id";
import { Team } from "../models/Team.js";
import { User } from "../models/User.js";

export async function createActivity(req, res) {
    const user = await User.findById(req.session.passport.user);

    if (user.role == "manager") {
        const teamId = user.team;
        let team = await Team.findById(teamId);

        req.body._id = new ShortUniqueId({ dictionary: "number", length: 6 }).rnd();
        console.log(req.body);
        team.activities.push(req.body);

        await Team.findByIdAndUpdate(teamId, team);
        const updatedActivities = (await Team.findById(teamId)).activities;
        res.status(201).json({ updatedActivities });
    }
    else res.status(403).json({ message: "You are not the manager." });
}

export async function getActivity(req, res) {
    const activities = await getUserTeamIdTeamActivitiesFromUserId(req.session.passport.user, 1);
    for (const activity of activities) {
        if (activity._id == req.body.activityId) return res.status(200).json({ activity });
    }
    res.status(404).json({ message: "Activity not found." });
}

export async function getAllActivities(req, res) {
    const activities = await getUserTeamIdTeamActivitiesFromUserId(req.session.passport.user, 1);
    res.status(200).json({ activities });
}

export async function changeAttendance(req, res) {
    const userId = req.session.passport.user;
    console.log(userId);
    const activityId = req.body.activityId;
    const attendance = req.body.attendance;

    const { teamId, team, activities } = await getUserTeamIdTeamActivitiesFromUserId(userId, 0);
    let activity = activities.find((activity) => activity._id == activityId);

    if (activity == undefined) return res.status(404).json({ message: "Activity not found." });
    let attendeeEntry = activity.listOfAttendees.find((activity) => activity._id == userId)
    console.log(attendeeEntry);
    if (attendeeEntry != undefined) {
        attendeeEntry.attendance = attendance;
    }
    else {
        activity.listOfAttendees.push({ _id: userId, attendance: attendance });
    }
    console.log(activity.listOfAttendees);

    await Team.findByIdAndUpdate(teamId, team);
    res.status(200).json({ activity });
}

async function getUserTeamIdTeamActivitiesFromUserId(userId, onlyActivites) {
    const user = await User.findById(userId);
    const teamId = user.team;
    const team = await Team.findById(teamId);
    const activities = team.activities;

    if (onlyActivites) return activities;
    return { teamId, team, activities };
}

export async function deleteActivity(req, res) {
    const user = await User.findById(req.session.passport.user);

    if (user.role == "manager") {
        const { teamId, team, activities } = await getUserTeamIdTeamActivitiesFromUserId(user._id, 0);

        let activity = activities.find((activity) => activity._id == req.body.activityId);
        if (activity != undefined) {
            activities.splice(activity, 1);
            team.activities = activities;
            await Team.findByIdAndUpdate(teamId, team);
            res.sendStatus(204);
        }
        else res.status(404).json({ message: "Activity not found." });
    }
    else res.status(403).json({ message: "You are not the manager." });
}