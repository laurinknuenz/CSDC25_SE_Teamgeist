import mongoose from "mongoose";
import { User } from "../models/User.js"
import { createTeam, getTeamIdByInviteCode, addPlayerToTeam, addManagerToTeam } from "./teamController.js";

export async function createUser(req, res) {
    console.log(req.body);

    const inviteCode = req.body.inviteCode;
    if (inviteCode == "") {
        let newTeam = await createTeam(req, res);

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
    const updatedUser = User.findById(id);
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
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(204).json();
}