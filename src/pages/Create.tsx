import { useState } from "react";
import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";
import { URL_PATTERN } from "../utils/colors";

export default function Create() {
    const [config, setConfig] = useState({ show: false, useLLM: false });
    const [prompt, setPrompt] = useState("");

    console.log(prompt);

    return (
        <div
            className="min-h-screen bg-neutral-500"
            style={{ backgroundImage: URL_PATTERN }}
        >
            <Nav />

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

                {
                    config.show && (
                        <>
                            {
                                config.useLLM ? (
                                    <>
                                        <label htmlFor="import" className="block font-bold mt-4 mb-2 cursor-pointer">What is the quiz about?</label>
                                        <input
                                            id="import"
                                            className="border border-gray-300 p-2 rounded-xl hover:bg-gray-100 w-full mb-2"
                                            type="text"
                                            maxLength={60}
                                            onChange={(e) => setPrompt(e.target.value.slice(0, 60))}
                                        />
                                        <button
                                            className="w-full bg-green-900 text-white hover:bg-green-800 cursor-pointer p-2"
                                            onClick={() => setConfig({ show: true, useLLM: false })}
                                        >
                                            Create
                                        </button>
                                    </>
                                ) : (
                                    <CreateUpdateForm />
                                )
                            }
                        </>
                    )
                }


            </div>
        </div>
    )
}