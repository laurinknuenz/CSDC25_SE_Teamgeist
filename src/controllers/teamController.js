import { Team } from "../models/Team.js"
import { User } from "../models/User.js";

export async function createTeam(body) {
    const newTeam = await Team.create({ teamname: body.teamname, typeOfSport: body.typeOfSport });
    return newTeam;
}

export async function updateTeam(req, res) {
    console.log(req.body);

    const user = await User.findById(req.session.passport.user);
    if (user.role != "manager") res.status(403).json({ message: "You are not the manager." });
    else {
        const id = user.team;
        await Team.findByIdAndUpdate(id, req.body);
        const updatedTeam = await Team.findById(id);
        res.status(200).json({
            updatedTeam:
            {
                teamname: updatedTeam.teamname,
                typeOfSport: updatedTeam.typeOfSport
            }
        });
    }
}

export async function addManagerToTeam(teamId, playerId) {
    await Team.findByIdAndUpdate(teamId, { "manager": playerId });
    const updatedTeam = await Team.findById(teamId);
    return updatedTeam;
}

export async function addPlayerToTeam(teamId, playerId) {
    let team = await Team.findById(teamId);
    team.listOfMembers.push(playerId);

    await Team.findByIdAndUpdate(teamId, team);
    const updatedTeam = await Team.findById(teamId);
    return updatedTeam;
}

export async function removePlayerFromTeam(teamId, playerId) {
    let playersTeam = await Team.findById(teamId);
    playersTeam.listOfMembers.splice(playersTeam.listOfMembers.findIndex(item => item.toString() === playerId.toString()), 1);
    await Team.findByIdAndUpdate(teamId, playersTeam);
}

export async function getTeam(req, res) {
    const user = await User.findById(req.session.passport.user);
    const id = user.team;

    const team = await Team.findById(id);
    res.status(200).json({
        team: {
            teamname: team.teamname,
            typeOfSport: team.typeOfSport,
            listOfMembers: team.listOfMembers,
            inviteCode: team.inviteCode,
            manager: team.manager
        }
    });
}

export async function getTeamIdByInviteCode(inviteCode) {
    const team = await Team.find({ "inviteCode": inviteCode });
    if (team.length == 0) return null;
    return team[0]._id;
}

export async function deleteTeam(teamId) {
    await Team.findByIdAndDelete(teamId);
}