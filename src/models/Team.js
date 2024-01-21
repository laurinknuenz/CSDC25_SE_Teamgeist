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
        _id: {
            type: Number,
            required: true
        },
        subject: { type: String },
        type: {
            type: String,
            enum: ["Training", "Game", "Other Activity"]
        },
        opponent: { type: String },
        date: { type: Date },
        location: { type: String },
        listOfAttendees: [{
            _id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            attendance: { type: Boolean }
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