import { BsCaretLeftFill, BsCaretRightFill, BsQuestionCircle } from "react-icons/bs";
import type { ContentType } from "./Quiz";
import TextDisplay from "./TextDisplay";
import { useState } from "react";
import Content from "./Content";
import { toast } from "sonner";
import { playSound } from "../utils/functions";

type Props = {
    showExplanation: boolean;
    preStatement?: string;
    statement: string;
    contents?: ContentType[],
    tips?: string[];
    explanation?: ContentType;
    answer: string;
    mode: string;
}

export default function Question({ showExplanation, preStatement, statement, contents, tips, explanation, answer }: Props) {
    const [currentContent, setCurrentContent] = useState(0);
    const handleNextContent = () => {
        if (!contents) return;
        if (currentContent + 1 > contents.length - 1) {
            setCurrentContent(0);
        } else {
            setCurrentContent(currentContent + 1);
        }
    }

    const handlePreviousContent = () => {
        if (!contents) return;
        if (currentContent - 1 < 0) {
            setCurrentContent(contents.length - 1);
        } else {
            setCurrentContent(currentContent - 1);
        }
    }
    
    const handleTip = (content: string) => {
        toast.info(content);
        playSound("tip");
    }

    return (
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 rounded-2xl bg-white/90 shadow-6xl shadow-gray-600 border-4 border-neutral-600">
            {/* statement and content */}
            {
                !showExplanation && (
                    <div className="flex flex-col justify-center items-center p-4 gap-4">
                        <div>
                            {
                                preStatement && (
                                    <p className="text-lg font-light mb-3 text-center">
                                        <TextDisplay text={preStatement} />
                                    </p>
                                )
                            }
                            <h3 className="text-xl font-bold text-center">
                                <TextDisplay text={statement} />
                            </h3>
                        </div>
                        <div className="flex justify-between items-center">
                            {
                                contents && contents?.length > 1 && (
                                    <BsCaretLeftFill
                                        className="text-3xl cursor-pointer hover:scale-90"
                                        onClick={() => handlePreviousContent()}
                                    />
                                )
                            }
                            {
                                contents && (
                                    <Content
                                        content={contents[currentContent]}
                                    />
                                )
                            }

                            {
                                contents && contents?.length > 1 && (
                                    <BsCaretRightFill
                                        className="text-3xl cursor-pointer hover:scale-90"
                                        onClick={() => handleNextContent()}
                                    />
                                )
                            }
                        </div>
                        {/* tips */}
                        <div className="flex gap-2 mb-2">
                            {
                                tips?.map((t, i) => {
                                    return (
                                        <div key={i}>
                                            {
                                                <BsQuestionCircle
                                                    className="cursor-pointer hover:scale-105 hover:text-green-600"
                                                    onClick={() => handleTip(t)}
                                                />
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
            {/* explanation */}
            {
                showExplanation && (
                    <div className="text-center w-full">
                        <div className="p-4">
                            <h3 className="text-xl font-bold my-3 text-neutral-800">The right answer is:</h3>
                            <p className="text-2xl italic mt-4 text-green-600">
                                <TextDisplay text={answer} />
                            </p>
                            {
                                explanation &&
                                <>
                                    <h3 className="text-xl font-bold my-3 text-neutral-800">Explanation:</h3>
                                    <Content
                                        content={explanation}
                                    />
                                </>
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}