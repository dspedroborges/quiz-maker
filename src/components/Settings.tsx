import { useState, type FormEvent } from "react";
import useQuiz, { type SavedQuiz } from "../hooks/useQuiz";
import { BsCheck2Circle, BsCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import type { Question } from "./Quiz";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import { FiDownload } from "react-icons/fi";

export type SettingsType = {
    allQuestions: Question[];
    isInfinite: boolean;
    isRandom: boolean;
    take: number;
};

function downloadJson(data: unknown, filename: string) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

export default function Settings({ onSubmit }: { onSubmit: (formState: SettingsType) => void }) {
    const [formState, setFormState] = useState<SettingsType>({
        allQuestions: [],
        isInfinite: false,
        isRandom: true,
        take: 0,
    });
    const { saved, deleteQuiz } = useQuiz();
    const [chosenQuiz, setChosenQuiz] = useState<SavedQuiz>({
        quizName: "",
        allQuestions: []
    });
    const navigate = useNavigate();
    const [confirmDelete, setConfirmDelete] = useState({
        id: 0,
        state: false,
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "isInfinite" || name === "isRandom" || name === "answersAsSuggestions") {
            setFormState(prev => ({ ...prev, [name]: value === "true" }));
            return;
        }

        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (chosenQuiz.allQuestions.length > 0) {
            onSubmit(formState);
        } else {
            toast.success("You must choose one quiz to play ;-)");
        }
    };

    return (
        <div className="w-full lg:w-1/2 p-4 mx-auto border rounded-xl border-gray-300 bg-white">
            <Toaster position="top-right" />
            <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">Settings</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    {
                        saved.map((quiz, i) => {
                            return (
                                <div
                                    key={i}
                                    className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between w-full ${chosenQuiz.quizName == quiz.quizName && "bg-purple-100"}`}
                                    onClick={() => {
                                        if (chosenQuiz.quizName == quiz.quizName) {
                                            setChosenQuiz({ quizName: "", allQuestions: [] })
                                        } else {
                                            setChosenQuiz(quiz);
                                            setFormState({ ...formState, allQuestions: quiz.allQuestions });
                                        }
                                    }}
                                >
                                    {
                                        chosenQuiz.quizName == quiz.quizName ? (
                                            <BsCheck2Circle />
                                        ) : (
                                            <BsCircle className="text-xs" />
                                        )
                                    }
                                    <span>{quiz.quizName}</span>
                                    <div className="flex items-center gap-2">
                                        <BsPencilSquare
                                            className="hover:scale-105 cursor-pointer"
                                            onClick={() => {
                                                navigate("/update", {
                                                    state: quiz
                                                });
                                            }}
                                        />
                                        {
                                            i == confirmDelete.id && confirmDelete.state ? (
                                                <BsTrash
                                                    className="hover:scale-105 cursor-pointer text-red-600"
                                                    onClick={() => deleteQuiz!(saved, quiz.quizName)}
                                                />
                                            ) : (
                                                <BsTrash
                                                    className="hover:scale-105 cursor-pointer"
                                                    onClick={() => setConfirmDelete({ id: i, state: true })}
                                                />
                                            )
                                        }
                                        <FiDownload
                                            className="hover:scale-105 cursor-pointer"
                                            onClick={() => {
                                                downloadJson(quiz, `${quiz.quizName.toLowerCase().replaceAll(" ", "_")}_quiz.json`);
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        saved.length == 0 && (
                            <p className="text-center mt-3">You haven't created any quizzes yet.</p>
                        )
                    }
                </div>

                {
                    saved.length > 0 && (
                        <>
                            <div>
                                <label className="font-bold block mb-2 cursor-pointer" htmlFor="isInfinite">Infinite:</label>
                                <select className="border border-gray-300 w-full p-2" name="isInfinite" id="isInfinite" onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    <option value="true">Yes</option>
                                    <option value="false" selected>No</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-bold block mb-2 cursor-pointer" htmlFor="isRandom">Random:</label>
                                <select className="border border-gray-300 w-full p-2" name="isRandom" id="isRandom" onChange={handleChange} required>
                                    <option value="">Select...</option>
                                    <option value="true" selected>Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-bold block cursor-pointer" htmlFor="take">Take:</label>
                                <p className="text-xs text-gray-600 mb-2 mt-1">Leave at zero to take all</p>
                                <input className="border border-gray-300 w-full focus:outline-0 p-2" type="number" min={0} max={200} defaultValue={0} name="take" id="take" onChange={handleChange} required />
                            </div>
                            <button className="bg-green-600 hover:bg-green-800 text-white cursor-pointer px-8 py-2 rounded-lg">
                                Start
                            </button>
                        </>
                    )
                }
            </form>
        </div>
    );
}