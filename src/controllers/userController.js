import mongoose from "mongoose";
import { User } from "../models/User.js"
import { createTeam, getTeamIdByInviteCode, addPlayerToTeam, addManagerToTeam, removePlayerFromTeam, deleteTeam } from "./teamController.js";

export async function createUser(req, res) {
    const { inviteCode, username, password } = req.body;

    try {
        // Check for the invite code in the teams collection
        const team = await Team.findOne({ inviteCode: inviteCode });
        if (!team) {
            return res.status(400).json({ message: 'Invalid invite code.' });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken.' });
        }


    const inviteCode = req.body.inviteCode;
    if (inviteCode == "") {
        let newTeam = await createTeam(req);

        req.body.team = newTeam._id;
        req.body.role = "manager";
        const newUser = await User.create(req.body);

        addManagerToTeam(newTeam._id, newUser._id);
        res.status(201).json({ newUser, newTeam });
    }
    else {
        const invitedTeamId = await getTeamIdByInviteCode(inviteCode);
        req.body.team = invitedTeamId;
        req.body.role = "player";
        const newUser = await User.create(req.body);

        addPlayerToTeam(invitedTeamId, newUser._id);

        res.status(201).json({ newUser });
    }
}

export async function updateUser(req, res) {
    console.log(req.body);

    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body);
    const updatedUser = await User.findById(id);
    res.status(200).json({ updatedUser });
}

export async function getUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({ user });
}

export async function getAllUsers(req, res) {
    const users = await User.find();
    res.status(200).json({ users });
}

export async function deleteUser(req, res) {
    const userId = req.params.id;
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
        deleteTeam(teamId);
    }
    else {
        removePlayerFromTeam(teamId, userId)
        await User.deleteOne(userToDelete);
    }
    res.status(204).json();
}