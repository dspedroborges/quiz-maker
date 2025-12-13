import { BsHouse, BsPlusCircle } from "react-icons/bs";
import { MdUpload } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="bg-neutral-900 text-white flex items-center justify-between p-4">
            <h1 className="font-bold">Quiz Maker</h1>
            <ul className="flex justify-around gap-8">
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
            </ul>
        </nav>
    )
}