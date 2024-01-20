import mongoose from "mongoose";
import ShortUniqueId from 'short-unique-id';

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
        activityId: {
            type: String,
            required: true
        },
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
    }],
    inviteCode: {
        type: String,
        required: true,
        unique: true
    }
});

TeamSchema.pre("validate", function (next) {
    const invUid = new ShortUniqueId({ dictionary: "alphanum_upper", length: 6 });
    this.inviteCode = invUid.rnd();
    next();
});

export const Team = model("Team", TeamSchema);