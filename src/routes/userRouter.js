import express from 'express';
import { createUser, updateUser, getUser, getTeamMembers, deleteUser } from '../controllers/userController.js';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

const userRouter = express.Router();

userRouter.post("/", checkNotAuthenticated, createUser);
userRouter.put("/", checkAuthenticated, updateUser);
userRouter.get("/", checkAuthenticated, getUser);
userRouter.get("/teammembers", checkAuthenticated, getTeamMembers)
userRouter.delete("/", checkAuthenticated, deleteUser);

export default userRouter;