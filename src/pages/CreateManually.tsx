import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { URL_PATTERN } from "../utils/colors";

export default function Update() {
    return (
        <div
            className="min-h-screen bg-neutral-500"
            style={{ backgroundImage: URL_PATTERN }}
        >
            <Nav />
            <CreateUpdateForm />
        </div>
    )
}