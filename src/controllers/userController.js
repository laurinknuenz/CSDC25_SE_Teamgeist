import mongoose from "mongoose";
import { User } from "../models/User.js"
import { Team } from "../models/Team.js"

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

        // Create the user
        const newUser = new User({ username, password, team: team._id });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // console.log(req.body);
    // const newUser = await User.create(req.body);
    // res.status(201).json({ newUser });
}

export async function updateUser(req, res) {
    console.log(req.body);

    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json({ updatedUser });
}

export async function getUser(req, res) {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(201).json({ user });
}