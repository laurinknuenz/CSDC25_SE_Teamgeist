# Die "Teamgeist"-App
Teamgeist ist eine Web-App für Team- und Aktivitätenmanagement von Sportmannschaften, gebaut von einer Gruppe Studenten der FH Campus Wien, CSDC25BB, für die Lehrveranstaltung "Software Engineering".

## Teammembers
* Faryal Rasuli - Koordinator
* David Xing - Lead Designer
* Laurin Knünz - Lead Developer

## Benötigte Node.js Commands (im IDE Terminal ausführen):
### 1. One-time Commands
- **npm install** → Ausführen, wenn man zum ersten Mal das Repository gepulled hat, oder wenn jemand neue Packages zum Projekt hinzugefügt hat und diese Version gepushed wurde.
### 2. Commands you need all the time
- **npm run start-nodemon** → Mit diesem Command kann der Backend-Server mit Nodemon gestartet werden.

## In case multiple nodemons are active (not really needed)
- netstat -ano | findstr :3000
- taskkill /F /PID 9999 

## Project Structure Overview

### `/config`
- `dbconnection.js`: Configuration and setup for the database connection.
- `passport.js`: Passport.js configuration for authentication.

### `/controllers`
- `activitiesController.js`: Handles requests related to activity operations.
- `authController.js`: Handles authentication-related operations.
- `teamController.js`: Manages team-related requests.
- `userController.js`: Manages user-related requests.

### `/models`
- `Team.js`: Schema and model definition for teams.
- `User.js`: Schema and model definition for users.

### `/CSS`
Stylesheets for different components of the application.

### `/html`
HTML files for different views.

### `/images`
Logo image used across the platform.

### `/js`
Client-side JavaScript files to handle user interactions and data manipulation.

### `/routes`
- `activitiesRouter.js`: Routes for activity-related endpoints.
- `authRouter.js`: Routes for authentication-related endpoints.
- `mainRouter.js`: Main routes for the application.
- `teamRouter.js`: Routes for team-related operations.
- `userRouter.js`: Routes for user-related operations.

### `/server`
- `server.js`: The entry point for the server, setting up the application.

### `/util`
- `authcheck.js`: Utility functions for authentication checks.

### Root Files
- `.env`: Environment variables for the project (not tracked by git).
