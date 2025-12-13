import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { useLocation } from "react-router-dom";
import { URL_PATTERN } from "../utils/colors";

export default function Update() {
    const { state } = useLocation();
    return (
        <div
            className="min-h-screen bg-neutral-500"
            style={{ backgroundImage: URL_PATTERN }}
        >
            <Nav />
            <CreateUpdateForm savedQuiz={state} />
        </div>
    )
}