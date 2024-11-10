"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HomePage() {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try{
      const response = await axios.get("/api/posts")
      await setPosts(response.data)
    }catch(err: any){
      console.log(err)
      toast.error(err.message)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="h-[92vh] p-4 pb-20 pt-20 grid grid-cols-4 gap-4 ">

      {posts.map((post: any) => (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={post._id}>
          <img className="rounded-t-lg" style={{width: "100%", height: "50%"}} src={post.image} alt=""   />
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.shortDescription}</p>
          <a href={"post/"+post._id} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-yellow-800 ">
            Read more
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
      ))}

    </div>
  );
}