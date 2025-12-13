import { toast, Toaster } from "sonner";
import Nav from "../components/Nav";
import useQuiz from "../hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import { URL_PATTERN } from "../utils/colors";

export default function Import() {
    const quizStuff = useQuiz();
    const navigate = useNavigate();
    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                quizStuff.saveQuiz(quizStuff.saved, data);
                toast.success("Your quiz was succesfully imported!");
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } catch (e) {
                toast.error("Error");
            }
        };

        reader.readAsText(file);
    };

    return (
        <div
            className="min-h-screen bg-neutral-500"
            style={{ backgroundImage: URL_PATTERN }}
        >
            <Nav />
            <Toaster position="top-right" />
            <div className="bg-white w-full lg:w-1/2 p-4 rounded-xl mx-auto mt-4">
                <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">Import</h3>
                <label htmlFor="import" className="block font-bold mb-2 cursor-pointer">Import the JSON file</label>
                <input
                    id="import"
                    className="border border-gray-300 p-2 rounded-xl cursor-pointer hover:bg-gray-100"
                    type="file"
                    accept="application/json"
                    onChange={handleImport}
                />
            </div>
        </div>
    );
}