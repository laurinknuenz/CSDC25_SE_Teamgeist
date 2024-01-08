import express from 'express';
import path from 'path';
import { connectToDatabase } from '../config/dbconnection.js';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "/src/public/hello-world.html"));
});

app.listen(port, () => {
    console.log("Express: The server is now listening on http://localhost:3000/")
});

async function main() {
    connectToDatabase();
}

main();