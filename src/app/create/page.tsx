"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Create() {

    const router = useRouter()
    const [recipe, setRecipe] = useState({
        title: "",
        image: "",
        recipe: ""
    })

    const handleAddRecipe = async (e: any) => {
        e.preventDefault()
        const payload = {
            title: recipe.title,
            image: recipe.image,
            description: recipe.recipe
        }
        if (payload.title && payload.image && payload.description) {
        try{
            const response = await axios.post("/api/posts", payload)
            if (response.status == 200) {
                toast.success("Recipe created successfully")
                router.push("/")
            } else {
                toast.error("Failed to create recipe")
            }
        }catch(err){
            console.log(err)
        }
    }else{
        toast.error("All fields are required")
    }
    }

    return (
        <div className=" h-[85vh] pt-8 flex flex-col  justify-center  items-center " >
            <h1 className=" text-3xl text-red-600 " >Create Recipe</h1>

            <form className="max-w-sm mx-auto mt-8 ">
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 " onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} placeholder="URL" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                    <input type="text" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ocus:ring-green-500 focus:border-green-500 block w-full p-2.5 " placeholder="URL" onChange={(e) => setRecipe({ ...recipe, image: e.target.value })} required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900">Recipe</label>
                    <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ocus:ring-green-500 focus:border-green-500" placeholder="Recipe..." onChange={(e) => setRecipe({ ...recipe, recipe: e.target.value })}></textarea>
                </div>
                <div className="flex items-center justify-end" >
                <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={handleAddRecipe} >Add Recipe</button>
                </div>
                

            </form>

        </div>
    );
}