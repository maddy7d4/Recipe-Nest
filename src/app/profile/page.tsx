"use client"
import { destroyCookie, parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { decodeToken } from "../(helpers)/decodeJwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";

export default function Profile() {

    const [username, setUsername] = useState("");
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            const user = decodeToken(token) as any;
            if (user) {
                setUsername(user.name);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        destroyCookie(null, 'token', { path: '/' });
        router.push("/login")
    }

    return(
        <div className=" h-[92vh] pt-8 " >
            <div className=" flex flex-col gap-8 justify-center items-center h-[75vh] " >
                <h1 className=" text-3xl text-red-600 " >Profile</h1>
                {username ? <h3 className=" text-2xl " > Hii 👋🏽, {username}</h3> : <></>}
                <button className=" h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-black" onClick={handleLogout} >Logout</button>
            </div>
        </div>
    )
}
