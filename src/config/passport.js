import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../models/User.js";

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    const user = (await User.find({ "username": username }))[0];
    if (user === undefined || user.password !== password) {
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

passport.deserializeUser(async function (id, cb) {
  return cb(
    null,
    await User.findById(id)
  );
});
export default passport;