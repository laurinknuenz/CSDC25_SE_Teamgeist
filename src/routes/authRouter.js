import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

const authRouter = express.Router();

authRouter.post('/login', checkNotAuthenticated, login);
authRouter.post('/logout', checkAuthenticated, logout);

export default authRouter;