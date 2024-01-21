import express from 'express';
import path from 'path';
import connectToDatabase from '../config/dbconnection.js';
import passport from '../config/passport.js';
import session from 'express-session';

import authRouter from '../routes/authRouter.js';
import mainRouter from '../routes/mainRouter.js';
import userRouter from '../routes/userRouter.js';
import teamRouter from '../routes/teamRouter.js';

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'src/public')));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/teams', teamRouter);
app.use('/', mainRouter);

app.listen(port, () => {
    console.log("Express: The server is now listening on http://localhost:3000/");
});

async function main() {
  await connectToDatabase();
}

main();
