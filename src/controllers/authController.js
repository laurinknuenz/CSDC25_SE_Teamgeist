import passport from 'passport';

export function login(req, res, next) {
    console.log("Passport: Starting Authentication Process...");
    passport.authenticate('local', {
        failureRedirect: '',
        successRedirect: '/dashboard'
    })(req, res, next);
}

export function logout(req, res, next) {
    console.log("Passport: Logging out now...");
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/login");
    });
}