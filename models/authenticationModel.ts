import { connectDB } from "@/dbConfig/config";
import mongoose, { model, models, Schema } from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const userModel: any = models.User || model('User', userSchema);

export default userModel;