import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team"
    },
    role: {
        type: String,
        enum: ["user", "manager"]
    }
});

const User = model("User", UserSchema);
export default User;