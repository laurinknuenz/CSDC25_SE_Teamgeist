import express from 'express';
import path from 'path';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

const mainRouter = express.Router();
const feUrl = "src/public";

mainRouter.get('/', (req, res) => {
    res.redirect('/dashboard');
});

mainRouter.get('/login', (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "/html/login.html"));
});

mainRouter.get('/register', (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "/html/registration.html"));
});

mainRouter.get('/dashboard', (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "/html/dashboard.html"));
});

mainRouter.get('/detailPlayer', (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "/html/details_player.html"));
});

mainRouter.get('/detailTeam', (req, res) => {
    res.sendFile(path.join(process.cwd(), feUrl, "/html/details_team.html"));
});

export default mainRouter;