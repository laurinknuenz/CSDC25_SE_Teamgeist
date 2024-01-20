import express from 'express';
import path from 'path';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

const mainRouter = express.Router();
const feUrl = "src/public/html/";

mainRouter.get('/', (req, res) => {
    res.redirect('/dashboard');
});

mainRouter.get('/login', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "login.html"));
});

mainRouter.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "registration.html"));
});

mainRouter.get('/dashboard', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "dashboard.html"));
});

mainRouter.get('/userDetails', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "details_player.html"));
});

mainRouter.get('/teamDetails', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "details_team.html"));
});

export default mainRouter;