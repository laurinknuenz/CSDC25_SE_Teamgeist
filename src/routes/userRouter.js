import express from 'express';
import { createUser, updateUser, getUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", getUser)

export default userRouter;