import { useState } from "react";
import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { URL_PATTERN } from "../utils/colors";
import { useMutation } from "@tanstack/react-query";
import { fetchQuiz } from "../requests/fetchQuiz";
import useQuiz from "../hooks/useQuiz";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const [config, setConfig] = useState({ show: false, useLLM: false });
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();
    const quizStuff = useQuiz();

    const quizMutation = useMutation({
        mutationFn: (prompt: string) => fetchQuiz(`
            Make an array of questions about ${prompt} in the following format:

            type FileType = "text" | "image" | "audio" | "video" | "youtube";

            type ContentType = { type: FileType, value: string };

            type ModeType = { name: "click" } | { name: "type", answersAsSuggestions: boolean } | { name: "explanation" };

            type Question = {
                category: string;
                preStatement: string;
                statement: string;
                content: ContentType[];
                options: string[];
                answer: string;
                time: number;
                explanation: ContentType;
                tips: string[];
                mode: ModeType;
            };

            In content of type text, you may use $ to Latex. For example: $latex here$.

            Only use Latex to topics related to Math.

            You must not show the answer in the content! You must not show the answer in the tips!

            You must not use the contets as alternatives. That's why we have the options.

            One of the options must be the answer and it has to be exactly like it's written in the options!

            Make preference to the click mode.
            
            You must give your answer as a JSON. Do not say anything else.
        `),
        retry: 1,
        onSuccess: (data) => {
            if (!data) return;
            quizStuff.saveQuiz(
                quizStuff.saved,
                {
                    quizName: prompt,
                    allQuestions: JSON.parse(
                        data.replaceAll("json", "").replaceAll("```", "")
                    ),
                }
            );
            toast.success("Your quiz has been created!");
            setTimeout(() => navigate("/"), 1000);
        },
    });

    return (
        <div className="min-h-screen bg-neutral-500" style={{ backgroundImage: URL_PATTERN }}>
            <Nav />
            <Toaster position="top-right" />
            <div className="bg-white w-full lg:w-1/2 p-4 rounded-xl mx-auto mt-4">
                <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">Create</h3>

                <div className="flex gap-1">
                    <button
                        className="w-full bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer p-2"
                        onClick={() => setConfig({ show: true, useLLM: true })}
                    >
                        Use LLM
                    </button>
                    <button
                        className="w-full bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer p-2"
                        onClick={() => setConfig({ show: true, useLLM: false })}
                    >
                        Create manually
                    </button>
                </div>

                {config.show && (
                    <>
                        {config.useLLM ? (
                            <>
                                <label htmlFor="import" className="block font-bold mt-4 mb-2 cursor-pointer">
                                    What is the quiz about?
                                </label>
                                <p className="bg-red-50 p-2 rounded-xl mb-2">
                                    <strong>Disclaimer: </strong>Be aware that not always the LLM produces trustworthy content and sometimes the quizzes might appear a little broken, but you can update them.
                                </p>
                                <input
                                    id="import"
                                    className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                    type="text"
                                    maxLength={60}
                                    onChange={(e) => setPrompt(e.target.value.slice(0, 60))}
                                />
                                <button
                                    className="w-full bg-green-900 text-white hover:bg-green-800 cursor-pointer p-2"
                                    onClick={() => quizMutation.mutate(prompt)}
                                >
                                    {quizMutation.isPending ? "Creating... Please, wait" : "Create"}
                                </button>
                            </>
                        ) : (
                            <CreateUpdateForm />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}