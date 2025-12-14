import { useState } from "react";
import { BsGithub, BsHouse, BsList, BsPlusCircle, BsX } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="bg-neutral-900 text-white flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
                <img src="/icon.png" className="w-8" />
                <h1 className="font-bold">Quiz Maker</h1>
            </div>
            <BsList
                className="text-xl lg:hidden cursor-pointer"
                onClick={() => setShowMenu(true)}
            />
            <ul className={`flex flex-col lg:flex-row justify-center lg:justify-around gap-2 mt-4 lg:mt-0 lg:gap-8 fixed h-screen lg:h-auto lg:w-auto bg-neutral-900 w-full top-0 left-0 items-center lg:static ${!showMenu ? "-translate-x-full" : "translate-x-0"} lg:translate-x-0 transition-transform`}>
                <BsX className="lg:hidden absolute top-2 right-2 text-3xl cursor-pointer" onClick={() => setShowMenu(false)} />
                <li className="hover:underline">
                    <Link to="/" className="flex gap-1 items-center">
                        <BsHouse />
                        Home
                    </Link>
                </li>
                <li className="hover:underline">
                    <Link to="/create" className="flex gap-1 items-center">
                        <BsPlusCircle />
                        Create
                    </Link>
                </li>
                <li className="hover:underline">
                    <Link to="/import" className="flex gap-1 items-center">
                        <MdUpload />
                        Import
                    </Link>
                </li>
                <li className="hover:underline">
                    <Link to="https://github.com/dspedroborges/quiz-maker" target="_blank" className="flex gap-1 items-center">
                        <BsGithub />
                        Github
                    </Link>
                </li>
            </ul>
        </nav>
    )
}