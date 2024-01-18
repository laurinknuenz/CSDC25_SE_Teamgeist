import express from 'express';
import path from 'path';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

const mainRouter = express.Router();
const feUrl = "src/public";

mainRouter.get('/', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/registration.html"));
});

mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/login.html"));
});

mainRouter.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/registration.html"));
});

mainRouter.get('/logout', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/login.html"));
});

mainRouter.get('/dashboard', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/dashboard.html"));
});

mainRouter.get('/updateUser', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/update-user.html"));
});

mainRouter.get('/updateTeam', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "html/update-team.html"));
});

export default mainRouter;