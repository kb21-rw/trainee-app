import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique:true
    },
    password: {
        type:String,
        
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN","COACH","TRAINEE"]
    },
    coach: {
        type:String,
    }
}, {timestamps:{}})

export default model("User", UserSchema)