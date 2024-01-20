import express from 'express';
import { updateTeam, getTeam } from '../controllers/teamController.js';
import activitiesRouter from './activitiesRouter.js';
import { checkAuthenticated } from '../util/authcheck.js';

const teamRouter = express.Router();

teamRouter.put("/", checkAuthenticated, updateTeam);
teamRouter.get("/", checkAuthenticated, getTeam);

teamRouter.use("/activities", activitiesRouter)

export default teamRouter;