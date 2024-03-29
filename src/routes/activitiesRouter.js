import express from 'express';
import { createActivity, deleteActivity, getActivity, getAllActivities, changeAttendance } from '../controllers/activitiesController.js';
import { checkAuthenticated } from '../util/authcheck.js';

const activitiesRouter = express.Router();

activitiesRouter.post("/new", checkAuthenticated, createActivity);
activitiesRouter.post("/", checkAuthenticated, getActivity);
activitiesRouter.get("/all/", checkAuthenticated, getAllActivities);
activitiesRouter.put("/", checkAuthenticated, changeAttendance);
activitiesRouter.delete("/", checkAuthenticated, deleteActivity);

export default activitiesRouter;