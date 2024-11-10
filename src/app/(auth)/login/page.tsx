"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const router = useRouter()

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const { email, password } = user;

        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await axios.post('/api/login', { email, password });

            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                toast.success("User logged in successfully");
                router.push("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (err: any) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                console.error(err);
                toast.error("Something went wrong");
            }
        }
    }
    return (
        <div className="flex items-center justify-center h-[93vh] flex-col" >
            <h1 className="text-3xl mb-8" >Login</h1>
            <form className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                <input onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="admin@gmail.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                <input onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="1234" required />
            </div>

            </form>
            <div className="flex items-center justify-center flex-col" >
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4" onClick={handleLogin} >Login</button>
                <h3>Create an account ? <Link href={'/signup'} ><span className="text-blue-500" >Signup</span></Link> </h3>
            </div>
        </div>
    )
}   