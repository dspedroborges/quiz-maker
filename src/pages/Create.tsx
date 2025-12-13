import { useState } from "react";
import CreateUpdateForm from "../components/CreateUpdateForm";
import Nav from "../components/Nav";

export default function Create() {
    const [config, setConfig] = useState({ show: false, useLLM: false });
    const [prompt, setPrompt] = useState("");

    return (
        <div
            className="bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(https://picsum.photos/id/77/1780)` }}
        >
            <Nav />

            <div className="bg-white w-full lg:w-1/2 p-4 rounded-xl mx-auto mt-4">
                <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">Create</h3>

                <div className="flex flex-col gap-2">
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