import { Team } from "../models/Team.js"

export async function createTeam(req, res) {
    const newTeam = await Team.create(req.body);
    return newTeam;
}

export async function updateTeam(req, res) {
    console.log(req.body);

    const id = req.params.id;
    await Team.findByIdAndUpdate(id, req.body);
    const updatedTeam = Team.findById(id);
    res.status(200).json({ updatedTeam });
}

export async function addManagerToTeam(teamId, playerId) {
    await Team.findByIdAndUpdate(teamId, {"manager": playerId});
    const updatedTeam = Team.findById(teamId);
    return updatedTeam;
}

export async function addPlayerToTeam(teamId, playerId) {
    let team = await Team.findById(teamId);
    team.listOfMembers.push(playerId);
    
    await Team.findByIdAndUpdate(teamId, team);
    const updatedTeam = Team.findById(teamId);
    return updatedTeam;
}

export async function getTeam(req, res) {
    const id = req.params.id;
    const team = await Team.findById(id);
    res.status(200).json({ team });
}

export async function getTeamIdByInviteCode(inviteCode) {
    const team = await Team.find({ "inviteCode": inviteCode });
    return team[0]._id;
}

export async function deleteTeam(req, res) {
    const id = req.params.id;
    await Team.findByIdAndDelete(id);
    res.status(204).json();
}