import passport from 'passport';
import path from 'path';
import { checkAuthenticated, checkNotAuthenticated } from '../util/authcheck.js';

export function login() {
    //checkNotAuthenticated();
    console.log("Auth Entry");
    passport.authenticate("local", {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    });
}

export function logout() {
    //checkAuthenticated();
    (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.sendFile(path.join(process.cwd(), "../public/login.html"));
        })
    }
}