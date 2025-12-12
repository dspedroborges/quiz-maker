import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";

export default function Create() {
    return (
        <div
            className="bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(https://picsum.photos/id/77/1780)` }}
        >
            <Nav />
            <CreateUpdateForm />
        </div>
    )
}