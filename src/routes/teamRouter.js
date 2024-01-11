import express from 'express';
import { createTeam, updateTeam, getTeam } from '../controllers/teamController.js';

const teamRouter = express.Router();

teamRouter.post("/", createTeam);
teamRouter.put("/:id", updateTeam);
teamRouter.get("/:id", getTeam)

export default teamRouter;