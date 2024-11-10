"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function signup() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleSignup = async (e: any) => {
        e.preventDefault();
        const payload = {
            name: userData.name && userData.name,
            email: userData.email && userData.email,
            password: userData.password && userData.password
        }


        try{
            if(payload.name && payload.email && payload.password){
                const response = await axios.post('/api/signup', payload)
                if(response.status === 200){
                    toast.success("User created successfully")
                    console.log(response.data)
                    router.push("/login")
                    payload.name = ""
                    payload.email = ""
                    payload.password = ""
                }
            }else{
                console.log("All fields are required")
                toast.error("All fields are required")
            }
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className="flex items-center justify-center h-[93vh] flex-col" >
            <h1 className="text-3xl mb-6" >Signup</h1>
            <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
                <input onChange={(e: any) => setUserData({...userData, name: e.target.value})} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Maddy" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input onChange={(e: any) => setUserData({...userData, email: e.target.value})} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="admin@gmail.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                <input onChange={(e: any) => setUserData({...userData, password: e.target.value})} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234" required />
            </div>

            </form>
            <div className="flex items-center justify-center flex-col" >
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4" onClick={handleSignup} >Sign up</button>
                <h3>Already have an account ? <Link href={'/login'} ><span className="text-blue-500" >Login</span></Link> </h3>
            </div>
        </div>
    )
}