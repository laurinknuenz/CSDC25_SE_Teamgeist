import express from 'express';
import { createActivity, deleteActivity, getActivity, getAllActivities, changeAttendance } from '../controllers/activitiesController.js';

const activitiesRouter = express.Router();

activitiesRouter.post("/", createActivity);
activitiesRouter.get("/:id", getActivity);
activitiesRouter.get("/", getAllActivities);
activitiesRouter.put("/:id",changeAttendance);
activitiesRouter.delete("/:id", deleteActivity);

export default activitiesRouter;