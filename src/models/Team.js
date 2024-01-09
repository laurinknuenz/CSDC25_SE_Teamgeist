import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const TeamSchema = new Schema({
    teamname: { type: String },
    typeOfSport: { type: String },
    manager: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    listOfMembers: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    activities: [{
        subject: { type: String },
        type: {
            type: String,
            enum: ["Training", "Game", "Other Activity"]
        },
        date: { type: Date },
        location: { type: String },
        listOfAttendees: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }]
    }]
});

const Team = model("Team", TeamSchema);
export default Team;