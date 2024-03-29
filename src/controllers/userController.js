import { Team } from "../models/Team.js";
import { User } from "../models/User.js"
import { createTeam, getTeamIdByInviteCode, addPlayerToTeam, addManagerToTeam, removePlayerFromTeam, deleteTeam } from "./teamController.js";

export async function createUser(req, res) {
    console.log(req.body);
    if ((await User.find({ "username": req.body.username })).length != 0) return res.status(409).json({ message: "Username already in use." });

    const inviteCode = req.body.inviteCode;
    if (inviteCode == "") {
        let newTeam = await createTeam(req.body);

        req.body.team = newTeam._id;
        req.body.role = "manager";
        const newUser = await User.create(req.body);

        await addManagerToTeam(newTeam._id, newUser._id);
        const user = returnUser(newUser);
        res.status(201).json({
            newUser: user,
            newTeam: {
                teamname: newTeam.teamname,
                typeOfSport: newTeam.typeOfSport,
                inviteCode: newTeam.inviteCode
            }
        });
    }
    else {
        const invitedTeamId = await getTeamIdByInviteCode(inviteCode);
        if (invitedTeamId === null) res.status(404).json("No team found for invite code.");
        else {
            req.body.team = invitedTeamId;
            req.body.role = "player";
            const newUser = await User.create(req.body);

            await addPlayerToTeam(invitedTeamId, newUser._id);

            const user = returnUser(newUser);
            res.status(201).json({
                newUser: user
            });
        }
    }
}

export async function updateUser(req, res) {
    console.log(req.body);

    const id = req.session.passport.user;
    await User.findByIdAndUpdate(id, req.body);
    const updatedUser = returnUser(await User.findById(id));
    res.status(200).json({ updatedUser });
}

export async function getUser(req, res) {
    const id = req.session.passport.user;
    const user = returnUser(await User.findById(id));
    res.status(200).json({ user });
}

function returnUser(newUser) {
    return ({
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role

    });
}

export async function getTeamMembers(req, res) {
    const id = req.session.passport.user;
    const user = await User.findById(id);
    const team = await Team.findById(user.team);
    const manager = returnUser(await User.findById(team.manager));
    manager.userId = team.manager._id;

    const teammembers = await User.find({ "team": team, "role": "player" });
    let returnTeammembers = [];
    for (let teammember of teammembers) {
        let returnTeammember = returnUser(teammember);
        returnTeammember.userId = teammember._id;
        returnTeammembers.push(returnTeammember);
    }
    res.status(200).json({
        "manager": manager,
        "teammembers": returnTeammembers
    });
}

export async function deleteUser(req, res) {
    const userId = req.session.passport.user;
    const userToDelete = await User.findById(userId);
    const teamId = userToDelete.team;
    console.log(userToDelete);

    if (userToDelete.role == "manager") {
        const users = await User.find();
        for (let user of users) {
            if (user.team.toString() == teamId)
                await User.deleteOne(user);
        }
        await User.deleteOne(userToDelete);
        await deleteTeam(teamId);
    }
    else {
        deletePlayer(teamId, userId)
    }
    res.status(204).end();
}

export async function deleteTeamMember(req, res) {
    const deletingUserId = req.session.passport.user;
    const deletingUser = await User.findById(deletingUserId);
    const userToDelete = await User.findById(req.body.userId);
    console.log(userToDelete);

    if (deletingUser.role != "manager") return res.status(401).json({ message: "You are not the manager." });
    if (userToDelete.team.toString() !== deletingUser.team.toString()) return res.status(401).json({ message: "The player is not in your team." });
    if (userToDelete.role == "manager") return res.status(401).json({ message: "You can not remove a manager in this way." });

    deletePlayer(userToDelete.team, userToDelete._id);
    res.status(204).end();
}

async function deletePlayer(teamId, userId) {
    await removePlayerFromTeam(teamId, userId);
    await User.findByIdAndDelete(userId);
}