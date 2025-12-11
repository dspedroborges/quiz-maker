import { useEffect, useState } from "react";
import type { ContentType, FileType, Question } from "./Quiz";
import Content from "./Content";
import { BsArrow90DegLeft, BsArrowRight, BsCaretLeftFill, BsCaretRightFill, BsPlusCircle, BsTrash } from "react-icons/bs";

const INITIAL_QUESTION: Question = {
    category: "",
    preStatement: "",
    statement: "",
    content: [],
    options: [],
    answer: "",
    time: 0,
    explanation: { type: "text", value: "" },
    tips: [],
    mode: { name: "click" }
};

const INITIAL_CONTENT: ContentType = { type: "text", value: "" };

export default function CreateUpdateForm({ questions }: { questions?: Question[] }) {
    const [allQuestions, setAllQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(INITIAL_QUESTION);
    const [currentContent, setCurrentContent] = useState<ContentType>(INITIAL_CONTENT);
    const [currentIndexContent, setCurrentIndexContent] = useState(0);
    const [currentIndexQuestion, setCurrentIndexQuestion] = useState(0);
    const INDEX_LAST_ELEMENT = allQuestions.length - 1;

    useEffect(() => {
        if (questions) {
            setAllQuestions(questions);
            setCurrentQuestion(questions[0]);
        }
    }, []);

    const resetCurrentQuestion = () => {
        setCurrentQuestion(INITIAL_QUESTION);
    }

    const handleNextContent = () => {
        let newIndex = 0;
        if (!(currentIndexContent + 1 > currentQuestion.content.length - 1)) {
            newIndex = currentIndexContent + 1;
        }
        setCurrentIndexContent(newIndex);
        setCurrentContent(currentQuestion.content[newIndex]);
    }

    const handlePreviousContent = () => {
        let newIndex = 0;
        if (currentIndexContent - 1 < 0) {
            newIndex = currentQuestion.content.length - 1;
        } else {
            newIndex = currentIndexContent - 1;
        }
        setCurrentIndexContent(newIndex);
        setCurrentContent(currentQuestion.content[newIndex]);
    }

    return (
        <div className="w-full lg:w-1/2 p-4 mx-auto rounded-xl border-gray-300 pb-16">
            <div className="bg-gray-50 p-4 rounded-xl shadow-xl">
                <div>
                    <p>Current question: {currentIndexQuestion + 1}</p>
                    <p>Total questions created: {allQuestions.length}</p>
                </div>
                <button onClick={() => {
                    console.log(allQuestions);
                }}>
                    Check
                </button>
                <h3 className="text-xl text-green-800 mb-4 border-b border-gray-300 pb-2 text-center">
                    Create
                </h3>

                <form className="flex flex-col gap-4">
                    <div>
                        <label className="font-bold block mb-2">Category</label>
                        <input
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, category: e.target.value })}
                            value={currentQuestion.category}
                            className="border border-gray-300 w-full p-2"
                            name="category"
                        />
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Pre-statement</label>
                        <input
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, preStatement: e.target.value })}
                            value={currentQuestion.preStatement}
                            className="border border-gray-300 w-full p-2"
                            name="preStatement"
                        />
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Statement</label>
                        <input
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, statement: e.target.value })}
                            value={currentQuestion.statement}
                            className="border border-gray-300 w-full p-2"
                            name="statement"
                        />
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Content</label>
                        <div className="flex justify-between">
                            {
                                currentQuestion.content.length > 1 && (
                                    <BsCaretLeftFill
                                        className="text-3xl cursor-pointer hover:scale-90"
                                        onClick={() => handlePreviousContent()}
                                    />
                                )
                            }
                            {
                                currentQuestion.content.length > 0 && (
                                    <Content
                                        content={currentQuestion.content[currentIndexContent]}
                                    />
                                )
                            }
                            {
                                currentQuestion.content.length > 1 && (
                                    <BsCaretRightFill
                                        className="text-3xl cursor-pointer hover:scale-90"
                                        onClick={() => handleNextContent()}
                                    />
                                )
                            }
                        </div>

                        <div className="mt-2 border border-gray-300 border-dashed p-4 rounded">
                            <select
                                onChange={(e) => setCurrentContent({ ...currentContent, type: e.target.value as FileType })}
                                className="border w-full p-1 mb-1"
                            >
                                <option value="text">text</option>
                                <option value="image">image</option>
                                <option value="audio">audio</option>
                                <option value="video">video</option>
                                <option value="youtube">youtube</option>
                            </select>

                            {
                                currentContent.type == "text" ? (
                                    <textarea
                                        onChange={(e) => setCurrentContent({ ...currentContent, value: e.target.value })}
                                        value={currentContent.value}
                                        className="border border-gray-300 w-full p-2 my-1 min-h-[100px]"
                                    ></textarea>
                                ) : (
                                    <input
                                        type="text"
                                        onChange={(e) => setCurrentContent({ ...currentContent, value: e.target.value })}
                                        value={currentContent.value}
                                        className="border border-gray-300 w-full p-2 my-1"
                                    />
                                )
                            }

                            <div className="w-full flex">
                                <button
                                    onClick={() => {
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            content: [...currentQuestion.content, currentContent]
                                        });
                                        setCurrentContent(INITIAL_CONTENT);
                                    }}
                                    type="button"
                                    className="bg-purple-900 hover:bg-purple-800 cursor-pointer w-full text-white py-2 mt-2 text-2xl"
                                >
                                    <BsPlusCircle className="mx-auto" />
                                </button>
                                <button
                                    onClick={() => setCurrentContent(INITIAL_CONTENT)}
                                    type="button"
                                    className="bg-neutral-700 hover:bg-neutral-800 cursor-pointer w-full text-white py-2 mt-2 text-2xl"
                                >
                                    <BsArrow90DegLeft className="mx-auto" />
                                </button>
                                <button
                                    onClick={() => {
                                        setCurrentQuestion({
                                            ...currentQuestion,
                                            content: [...currentQuestion.content].filter(c => c.value !== currentQuestion.content[currentIndexContent].value)
                                        });
                                    }}
                                    type="button"
                                    className="bg-red-700 hover:bg-red-800 cursor-pointer w-full text-white py-2 mt-2 text-2xl"
                                >
                                    <BsTrash className="mx-auto" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Options</label>
                        <textarea
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: e.target.value.split("\n") })}
                            value={currentQuestion.options.join("\n")}
                            className="border border-gray-300 w-full p-2"
                            placeholder="One option per line"
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Answer</label>
                        <input
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, answer: e.target.value })}
                            value={currentQuestion.answer}
                            className="border border-gray-300 w-full p-2"
                            name="answer"
                        />
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Time</label>
                        <input
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, time: Number(e.target.value) })}
                            value={currentQuestion.time}
                            className="border border-gray-300 w-full p-2"
                            type="number"
                            min="0"
                            name="time"
                        />
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Explanation</label>

                        <select
                            onChange={(e) => setCurrentQuestion({
                                ...currentQuestion,
                                explanation: { ...currentQuestion.explanation, type: e.target.value as FileType }
                            })}
                            value={currentQuestion.explanation.type}
                            className="border w-full p-1 mb-1"
                        >
                            <option value="text">text</option>
                            <option value="image">image</option>
                            <option value="audio">audio</option>
                            <option value="video">video</option>
                            <option value="youtube">youtube</option>
                        </select>


                        {
                            currentQuestion.explanation.type == "text" ? (
                                <textarea
                                    onChange={(e) => setCurrentQuestion({
                                        ...currentQuestion,
                                        explanation: { ...currentQuestion.explanation, value: e.target.value }
                                    })}
                                    value={currentQuestion.explanation.value}
                                    className="border border-gray-300 w-full p-2 my-1 min-h-[100px]"
                                ></textarea>
                            ) : (
                                <input
                                    onChange={(e) => setCurrentQuestion({
                                        ...currentQuestion,
                                        explanation: { ...currentQuestion.explanation, value: e.target.value }
                                    })}
                                    value={currentQuestion.explanation.value}
                                    className="border border-gray-300 w-full p-2 my-1"
                                />
                            )
                        }
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Tips</label>
                        <textarea
                            onChange={(e) => setCurrentQuestion({ ...currentQuestion, tips: e.target.value.split("\n") })}
                            value={currentQuestion.tips.join("\n")}
                            className="border border-gray-300 w-full p-2"
                            placeholder="One tip per line"
                        ></textarea>
                    </div>

                    <div>
                        <label className="font-bold block mb-2">Mode</label>
                        <select
                            onChange={(e) => {
                                const name = e.target.value as "click" | "type" | "explanation";
                                if (name === "type") {
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        mode: {
                                            name: "type",
                                            answersAsSuggestions: currentQuestion.mode.name === "type"
                                                ? currentQuestion.mode.answersAsSuggestions
                                                : false
                                        }
                                    });
                                } else {
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        mode: { name }
                                    });
                                }
                            }}
                            value={currentQuestion.mode.name}
                            className="border border-gray-300 w-full p-2"
                        >
                            <option value="">Select...</option>
                            <option value="click">Click</option>
                            <option value="type">Type</option>
                            <option value="explanation">Explanation</option>
                        </select>

                        {currentQuestion.mode.name === "type" && (
                            <select
                                onChange={(e) =>
                                    setCurrentQuestion({
                                        ...currentQuestion,
                                        mode: {
                                            name: "type",
                                            answersAsSuggestions: e.target.value === "true"
                                        }
                                    })
                                }
                                value={String(currentQuestion.mode.answersAsSuggestions)}
                                className="border border-gray-300 w-full p-2 mt-2"
                            >
                                <option value="false">No suggestions</option>
                                <option value="true">With suggestions</option>
                            </select>
                        )}
                    </div>

                    <div className="fixed bottom-0 left-0 w-full flex">
                        {
                            currentIndexQuestion > 0 && (
                                <div
                                    onClick={() => {
                                        setCurrentIndexQuestion(prev => prev - 1);
                                        setCurrentQuestion(allQuestions[currentIndexQuestion - 1]);
                                    }}
                                    className="bg-neutral-600 hover:bg-neutral-800 text-white px-8 py-2 w-full text-center cursor-pointer text-2xl"
                                >
                                    <BsArrow90DegLeft className="mx-auto" />
                                </div>
                            )
                        }

                        {
                            currentIndexQuestion <= INDEX_LAST_ELEMENT && (
                                <div
                                    onClick={() => {
                                        setAllQuestions([...allQuestions].filter(q => q.statement !== currentQuestion.statement))
                                    }}
                                    className="bg-red-600 hover:bg-red-800 text-white px-8 py-2 w-full text-center cursor-pointer text-2xl"
                                >
                                    <BsTrash className="mx-auto" />
                                </div>)
                        }

                        <div
                            onClick={() => {
                                if (currentIndexQuestion > INDEX_LAST_ELEMENT) {
                                    setAllQuestions([...allQuestions, currentQuestion]);
                                    resetCurrentQuestion();
                                    setCurrentIndexQuestion(prev => prev + 1);
                                } else if (currentIndexQuestion < INDEX_LAST_ELEMENT) {
                                    setCurrentQuestion(allQuestions[currentIndexQuestion + 1]);
                                    setCurrentIndexQuestion(prev => prev + 1);
                                } else {
                                    resetCurrentQuestion();
                                    setCurrentIndexQuestion(prev => prev + 1);
                                }
                            }}
                            className="bg-green-600 hover:bg-green-800 text-white px-8 py-2 w-full text-center cursor-pointer text-2xl"
                        >
                            {
                                currentIndexQuestion > INDEX_LAST_ELEMENT ? <BsPlusCircle className="mx-auto" /> : <BsArrowRight className="mx-auto" />
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}