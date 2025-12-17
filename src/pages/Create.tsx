import { useState } from "react";
import Nav from "../components/Nav";
import { URL_PATTERN } from "../utils/colors";
import { useMutation } from "@tanstack/react-query";
import { fetchQuiz } from "../requests/fetchQuiz";
import useQuiz from "../hooks/useQuiz";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "react-router-dom";

type Prompt = {
    name: string;
    content: string;
    amountQuestions: number;
    useLatex: boolean;
}

export default function Create() {
    const [config, setConfig] = useState({ show: false, useLLM: false });
    const [prompt, setPrompt] = useState<Prompt>({
        name: "",
        content: "",
        amountQuestions: 0,
        useLatex: false,
    });
    const navigate = useNavigate();
    const quizStuff = useQuiz();

    const quizMutation = useMutation({
        mutationFn: (prompt: Prompt) => fetchQuiz(`
            Make an array of questions about ${prompt.content} in the following format:

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

            ${prompt.useLatex ? "You may use $ to Latex. For example: $latex here$." : ""}

            You must not show the answer in the content! You must not show the answer in the tips!

            You must not use the contents as alternatives. That's why we have the options. Contents are supposed to be used as auxiliary information or when you need to provide more details. If that's not necessary, leave them empty.

            One of the options must be the answer and it has to be exactly like it's written in the options!

            You have to produce ${prompt.amountQuestions <= 25 ? prompt.amountQuestions : 25} questions!

            Make preference to the click mode.
            
            You must give your answer as a JSON. Do not say anything else.
        `),
        retry: 1,
        onSuccess: (data) => {
            if (!data) return;
            quizStuff.saveQuiz(
                quizStuff.saved,
                {
                    quizName: prompt.name,
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
                    <Link
                        className="w-full bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer p-2 text-center"
                        to="/create/manually"
                    >
                        Create manually
                    </Link>
                </div>

                {config.show && (
                    <>
                        {config.useLLM && (
                            <>
                                <div>
                                    <label htmlFor="name" className="block font-bold mt-4 mb-2 cursor-pointer">
                                        Name of the quiz
                                    </label>
                                    <input
                                        id="name"
                                        className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                        type="text"
                                        maxLength={60}
                                        onChange={(e) => setPrompt({ ...prompt, name: e.target.value.slice(0, 60) })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="import" className="block font-bold mt-4 mb-2 cursor-pointer">
                                        What is the quiz about?
                                    </label>
                                    <input
                                        id="import"
                                        className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                        type="text"
                                        maxLength={60}
                                        onChange={(e) => setPrompt({ ...prompt, content: e.target.value.slice(0, 60) })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="useLatex" className="block font-bold mt-4 mb-2 cursor-pointer">
                                        Use Latex
                                    </label>
                                    <select
                                        onChange={(e) => setPrompt({ ...prompt, useLatex: e.target.value == "true" })}
                                        className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                        id="useLatex"
                                        defaultValue="false"
                                    >
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="amountQuestions" className="block font-bold mt-4 mb-2 cursor-pointer">
                                        Amount of questions
                                    </label>
                                    <input
                                        id="amountQuestions"
                                        className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                        type="number"
                                        onChange={(e) => setPrompt({ ...prompt, amountQuestions: Number(e.target.value) })}
                                    />
                                </div>
                                <p className="bg-red-50 p-2 rounded-xl mb-2 text-xs">
                                    <strong>Disclaimer: </strong>Be aware that not always the LLM produces trustworthy content and sometimes the quizzes might appear a little broken, but you can update them.
                                </p>
                                <button
                                    className="w-full bg-green-900 text-white hover:bg-green-800 cursor-pointer p-2"
                                    onClick={() => quizMutation.mutate(prompt)}
                                >
                                    {quizMutation.isPending ? "Creating... Please, wait" : "Create"}
                                </button>
                            </>
                        )
                    }
                    </>
                )}
            </div>
        </div>
    );
}