import express from 'express';
import { createTeam, updateTeam, getTeam, deleteTeam } from '../controllers/teamController.js';

const teamRouter = express.Router();

teamRouter.put("/:id", updateTeam);
teamRouter.get("/:id", getTeam);

export default teamRouter;