import { connectDB } from "@/dbConfig/config";
import { postModel } from "../../../../models/postModel";



export const GET = async (req: Request) => {
    try{
        await connectDB()
        const posts = await postModel.find({})
        return new Response(JSON.stringify(posts), {status: 200, headers:{
            'content-type': 'application/json'
        }})
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify(err), {status: 400})
    }
}

export const POST = async (req: Request) => {
    const body = await req.json();  
    console.log(body)
    try{
        await connectDB()
        if(body.title && body.description && body.image){
                const post = await postModel.create(body)
                return new Response(JSON.stringify({message: "Post created successfully"}), {status: 200, headers:{
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