import express from 'express';
import path from 'path';
import connectToDatabase from '../config/dbconnection.js';
import passport from '../config/passport.js';
import session from 'express-session';

const app = express();

const port = 3000;

app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/index.html"));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/Player Information.html"));
});


app.listen(port, () => {
    console.log("Express: The server is now listening on http://localhost:3000/")
});

async function main() {
    connectToDatabase();
}

main();