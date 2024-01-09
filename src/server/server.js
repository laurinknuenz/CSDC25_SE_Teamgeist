import express from "express";
import path from "path";
import connectToDatabase from "../config/dbconnection.js";
import passport from "../config/passport.js";
import session from "express-session";
import User from "../models/User.js";

const app = express();
const port = 3000;

// Setup session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), "src/public")));

// Middleware to parse the request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/src/public/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    // Destructure the information from req.body
    const { inviteCode, username, password, confirmPassword } = req.body;

    // Perform your validation (e.g., check if passwords match)
    if (password !== confirmPassword) {
      res.status(400).send("Passwords do not match.");
      return;
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).send("Username is already taken.");
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user to the database
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Handle any success
    res.status(201).send("User registered successfully.");
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send("An error occurred during registration.");
  }
});

app.listen(port, () => {
  console.log("Express: The server is now listening on http://localhost:3000/");
});

async function main() {
  connectToDatabase();
}

main();
