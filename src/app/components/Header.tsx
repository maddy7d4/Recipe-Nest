"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {

    const path = usePathname()

    return (
        <div className="flex items-center justify-between items-center mt-2" >
            <Link href={'/'}> <h1 className="text-3xl ml-2 " ><span className="text-red-600">Recipe</span> Nest</h1></Link>
            {
                path !== "/login" && path !== "/signup" &&
                <nav className="mr-4 flex items-center justify-center">
                    <ul className="flex flex-row gap-4 items-center  justify-center" >
                        <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 focus:outline-none focus:ring-4 focus:ring-red-200  rounded-lg text-sm p-2.5 me-1">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                        <div className="relative hidden md:block">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                                <span className="sr-only">Search icon</span>
                            </div>
                            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 " placeholder="Search..." />
                        </div>
                        <li className="cursor-pointer text-red-600 text-lg " ><Link href={'/create'} >Create</Link></li>
                        <li className="cursor-pointer text-red-600 text-lg " ><Link href={'/profile'} >Profile</Link></li>
                    </ul>
                </nav>
            }
        </div>
    )
}