import mongoose from "mongoose";
import { User } from "../models/User.js"

export async function createUser(req, res) {
    console.log(req.body);
    console.log("test");
    const newUser = await User.create(req.body);
    res.status(201).json({ newUser });
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