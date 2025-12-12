import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";

export default function Update() {
    const { state } = useLocation();
    return (
        <div className="bg-neutral-600">
            <Nav />
            <CreateUpdateForm savedQuiz={state} />
        </div>
    )
}