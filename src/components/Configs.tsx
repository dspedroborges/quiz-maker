import { useState, type FormEvent } from "react";

type FormState = {
    allQuestions: string;
    isInfinite: boolean;
    isRandom: boolean;
    take: string;
    mode: string;
    answersAsSuggestions: string;
};

export default function Configs({ onSubmit }: { onSubmit: (formState: FormState) => void }) {
    const [formState, setFormState] = useState<FormState>({
        allQuestions: "",
        isInfinite: false,
        isRandom: false,
        take: "",
        mode: "",
        answersAsSuggestions: ""
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        if (name === "isInfinite" || name === "isRandom") {
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
        <div className="w-full lg:w-1/2 bg-white/90 p-2 rounded-xl fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-xl text-green-800">Configs</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="allQuestions">All questions:</label>
                    <textarea name="allQuestions" id="allQuestions" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="isInfinite">Infinite:</label>
                    <select name="isInfinite" id="isInfinite" onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="isRandom">Random:</label>
                    <select name="isRandom" id="isRandom" onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="take">Take:</label>
                    <input type="number" min={1} max={200} name="take" id="take" onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="mode">Mode:</label>
                    <select name="mode" id="mode" onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="type">Type the answer</option>
                        <option value="click">Click the answer</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="answersAsSuggestions">Answers as suggestions:</label>
                    <select name="answersAsSuggestions" id="answersAsSuggestions" onChange={handleChange}>
                        <option value="">Select...</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <button className="bg-green-600 hover:bg-green-800 text-white cursor-pointer px-8 py-2 rounded-lg">
                    Start
                </button>
            </form>
        </div>
    );
}