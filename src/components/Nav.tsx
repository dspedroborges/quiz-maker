import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="bg-neutral-900 text-white flex items-center justify-between p-4">
            <h1 className="font-bold">Quiz Maker</h1>
            <ul className="flex justify-around gap-4">
                <li className="hover:underline">
                    <Link to="/">
                        Home
                    </Link>
                </li>
                <li className="hover:underline">
                    <Link to="/create">
                        Create
                    </Link>
                </li>
            </ul>
        </nav>
    )
}