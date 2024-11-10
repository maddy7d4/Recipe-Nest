import { connectDB } from "@/dbConfig/config"
import { postModel } from "../../../../../models/postModel"

export const GET = async (req: Request, {params}: any) => {
    try{
        await connectDB()
        const id = await params.id
        const post = await postModel.find({_id: id})
        return new Response(JSON.stringify(post), {status: 200, headers:{
            'content-type': 'application/json'
        }})
    }catch(err){
        console.log(err)
        return new Response(JSON.stringify(err), {status: 400})
    }
}