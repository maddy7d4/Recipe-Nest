"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Post({params}: any) {

    const [post, setPost] = useState([]);
    const id = params.id

    const fetchPost = async () => {
        try{

            const response = await axios.get("/api/post/"+id)
            await setPost(response.data)
        }catch(err: any){
            console.log(err)
            toast.error(err.message)
        }
    }

    useEffect(() => {
        fetchPost()
        setInterval(() => {
            document.querySelector("body > nextjs-portal")?.remove();
        }, 10);
        
    }, [])

    return (
        <div className="w-full flex justify-center items-center mt-6  " >
            {post.map((item: any) => (
                <div className=" w-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex justify-center items-center flex-col pt-8 h-screen" key={item._id}>
                        <img className="rounded-lg" style={{width: "500px", height: "300px"}} src={item.image} alt="" width={500} height={300}  />
                    <div className="p-5 flex justify-center items-center flex-col">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">{item.title}</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-5/6">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}