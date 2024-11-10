import { connectDB } from "@/dbConfig/config";
import userModel from "../../../../models/authenticationModel";

import bcrypt from 'bcryptjs';

export const POST = async (req: Request) => {
  const body = await req.json();  
  try{
    await connectDB()
    if(body.name && body.email && body.password){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt);
        const user = await userModel.create({...body, password: hashedPassword})
        return new Response(JSON.stringify({message: "User created successfully"}), {status: 200, headers:{
            'content-type': 'application/json'
        }})
    }else{
        return new Response(JSON.stringify({message: "All fields are required"}), {status: 400})
    }
  }catch(err){
    console.log(err)
    return new Response(JSON.stringify(err), {status: 400})
  }
} 
