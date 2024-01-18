import passport from "passport";
import LocalStrategy from "passport-local";
import { User } from "../models/User.js"; // Import the User model
//const users = null; //TODO: GET ALL USERS FROM MONGODB WITH MONGOOSE

new LocalStrategy(async function verify(username, password, done) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

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
