import { connectDB } from "@/dbConfig/config";
import userModel from "../../../../models/authenticationModel";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const POST = async (req: Request) => {
    try {
        const {email, password} = await req.json();

        if (!email || !password) {
            return new Response(JSON.stringify({message: "All fields are required"}), {status: 400})
        }

        await connectDB()
        const user = await userModel.findOne({email: email})

        if (!user) {
            return new Response(JSON.stringify({message: "User not found"}), {status: 400})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return new Response(JSON.stringify({message: "Incorrect password"}), {status: 400})
        }

        const token = jwt.sign({ userId: user._id, name: user.name }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        const response = new Response(JSON.stringify({ message: "User logged in successfully", token }), {
            status: 200,
            headers: {
                'content-type': 'application/json',
                'Set-Cookie': `token=${token}; Max-Age=3600; Path=/`
            }
        });
        return response;
        
    }catch(err){
        console.error(err)
        return new Response(JSON.stringify({"message": "Something went wrong"}), {status: 500})
    }
}
