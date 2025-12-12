import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";

export default function Update() {
    const { state } = useLocation();
    return (
        <div
            className="bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(https://picsum.photos/id/77/1780)` }}
        >
            <Nav />
            <CreateUpdateForm savedQuiz={state} />
        </div>
    )
}