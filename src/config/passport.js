import passport from "passport";
import LocalStrategy from "passport-local";

const users = null; //TODO: GET ALL USERS FROM MONGODB WITH MONGOOSE

passport.use(
    new LocalStrategy(function verify(username, password, cb) {
        let user = null;
        users.forEach((loopUser) => {
            if (loopUser.username === username) user = loopUser;
        });

        const passAuth = bcrypt.compare(password, user.password);
        if (user === null || !passAuth) {
            console.log("Passport: Incorrect username or password.");
            return cb(null, false, { message: "Incorrect username or password." });
        }

        console.log("Passport: Login succeeded!");
        return cb(null, user);
    })
);

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    return cb(
        null,
        users.find((user) => user.id === id)
    );
});
export default passport;