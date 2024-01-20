import express from 'express';
import { updateTeam, getTeam } from '../controllers/teamController.js';
import activitiesRouter from './activitiesRouter.js';

const teamRouter = express.Router();

teamRouter.put("/:id", updateTeam);
teamRouter.get("/:id", getTeam);

teamRouter.use("/activities", activitiesRouter)

export default teamRouter;