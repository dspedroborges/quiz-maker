import { useState, type FormEvent } from "react";

export type SettingsType = {
    allQuestions: string;
    isInfinite: boolean;
    isRandom: boolean;
    take: number;
};

export default function Settings({ onSubmit }: { onSubmit: (formState: SettingsType) => void }) {
    const [formState, setFormState] = useState<SettingsType>({
        allQuestions: "",
        isInfinite: false,
        isRandom: false,
        take: 0,
    });
    const [specifyTake, setSpecifyTake] = useState(false);

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
        onSubmit(formState);
    };

    return (
        <div className="w-full lg:w-1/2 p-4 mx-auto border rounded-xl border-gray-300 bg-white">
            <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">Settings</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="font-bold block mb-2 cursor-pointer" htmlFor="allQuestions">Questions:</label>
                    <textarea className="border border-gray-300 w-full focus:outline-0 p-2 min-h-[50px]" name="allQuestions" id="allQuestions" onChange={handleChange} required />
                </div>

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
                    <label className="font-bold block mb-2 cursor-pointer" htmlFor="specifyTake">Specify take:</label>
                    <select className="border border-gray-300 w-full p-2" name="specifyTake" id="specifyTake" onChange={(e) => setSpecifyTake(e.target.value == "true")} required>
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false" selected>No</option>
                    </select>
                </div>

                {
                    specifyTake && (
                        <div>
                            <label className="font-bold block mb-2 cursor-pointer" htmlFor="take">Take:</label>
                            <input className="border border-gray-300 w-full focus:outline-0 p-2" type="number" min={0} max={200} name="take" id="take" onChange={handleChange} required />
                        </div>

                    )
                }
                <button className="bg-green-600 hover:bg-green-800 text-white cursor-pointer px-8 py-2 rounded-lg">
                    Start
                </button>
            </form>
        </div>
    );
}