import { Team } from "../models/Team.js"

export async function createTeam(req, res) {
    console.log(req.body)
    const newTeam = await Team.create(req.body);
    res.status(201).json({ newTeam });
}

export async function updateTeam(req, res) {
    console.log(req.body);

    const id = req.params.id;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body);
    res.status(200).json({ updatedTeam });
}

export async function getTeam(req, res) {
    const id = req.params.id;
    const team = await Team.findById(id);
    res.status(201).json({ team });
}