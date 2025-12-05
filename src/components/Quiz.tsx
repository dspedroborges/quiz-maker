import { useEffect, useRef, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill, BsCheckCircle, BsQuestionCircle, BsSend } from "react-icons/bs";
import { toast, Toaster } from "sonner";
import { normalizeString, shuffleArray } from "../utils/functions";
import { DEFAULT_PALETTE } from "../utils/colors";
import TopBar from "./TopBar";
import Content from "./Content";

type Question = {
    category: string;
    preStatement: string;
    statement: string;
    content: { type: "text" | "image" | "audio" | "video" | "youtube", value: string }[]; // it can be a youtube link, image, audio or video
    options: string[];
    answer: string;
    time: number;
    explanation: string; // it can be a youtube link, image, audio or video
    tips: string[];
};

type Props = {
    allQuestions: Question[];
    isInfinite: boolean;
    isRandom: boolean;
    take?: number;
    mode: { name: "click" } | { name: "type", answersAsSuggestions: boolean };
};

export default function Quiz({ allQuestions, isInfinite, isRandom, take, mode }: Props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentContent, setCurrentContent] = useState(0);
    const [playerStats, setPlayerStats] = useState({
        totalRight: 0,
        performance: "0.00%",
    });
    const [totalDone, setTotalDone] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [questions, setQuestions] = useState<Question[]>(allQuestions);
    const [typedAnswer, setTypedAnswer] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contents = questions[currentQuestion].content;

    useEffect(() => {
        let pool = [...questions];
        if (isRandom) {
            pool = shuffleArray(pool);
        }

        if (take) {
            pool = pool.slice(0, take);
        }

        setQuestions(pool);
    }, [isFinished]);

    useEffect(() => {
        if (mode.name !== "type") return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                buttonRef?.current?.click();
            } else {
                inputRef?.current?.focus();
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const playSound = (sound: string) => {
        const audio = new Audio(`/sound_effects/${sound}.wav`);
        audio.play();
    };

    const handleNextContent = () => {
        if (currentContent + 1 > contents.length - 1) {
            setCurrentContent(0);
        } else {
            setCurrentContent(currentContent + 1);
        }
    }

    const handlePreviousContent = () => {
        if (currentContent - 1 < 0) {
            setCurrentContent(contents.length - 1);
        } else {
            setCurrentContent(currentContent - 1);
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            toast.success("You've finished it!");
            playSound("finish");
            setIsFinished(true);
        }

        setCurrentContent(0);
        setTotalDone(totalDone + 1);
        setTypedAnswer("");
    }

    const handleAnswer = (answer: string) => {
        if (isFinished) return;

        if (normalizeString(answer) == normalizeString(questions[currentQuestion].answer)) {
            toast.success("Right!");
            let totalRight = playerStats.totalRight + 1;
            let performance = (totalRight / (totalDone + 1) * 100).toFixed(2) + "%";
            playSound("right");
            setPlayerStats({ totalRight, performance })
        } else {
            playSound("wrong");
            toast.error(`Wrong! ${questions[currentQuestion].explanation}`);
        }
        handleNextQuestion();
    }

    const getTotalQuestions = () => {
        return take ? take : questions.length;
    }

    const handleTimeUp = () => {
        if (isFinished) return;
        playSound("timeout");
        toast.error(`Time's up! ${questions[currentQuestion].explanation}`);
        handleNextQuestion();
    }

    const handleTip = (content: string) => {
        toast.info(content);
        playSound("tip");
    }

    const restart = () => {
        playSound("start");
        toast.info("You've restarted the quiz");
        setTotalDone(0);
        setCurrentQuestion(0);
        setIsFinished(false);
        setPlayerStats({ totalRight: 0, performance: "0.00%" });
    }

    return (
        <div>
            <Toaster position="top-right" />
            {
                isFinished && (
                    <div className="bg-white rounded-xl w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-8 items-center justify-center">
                        <p className="text-xl text-green-800"><span className="font-bold">Congrats!</span> You've reached the end of it. Wanna try again?</p>
                        <ul>
                            <li className="flex items-center gap-2">
                                <BsCheckCircle className="text-green-800" />
                                <span>Total questions: <span className="font-bold">{totalDone}</span></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <BsCheckCircle className="text-green-800" />
                                <span>Total right: <span className="font-bold">{playerStats.totalRight}</span></span>
                            </li>
                            <li className="flex items-center gap-2">
                                <BsCheckCircle className="text-green-800" />
                                <span>Performance: <span className="font-bold">{playerStats.performance}</span></span>
                            </li>
                        </ul>
                        <div className="flex gap-4">
                            <button
                                className="bg-green-600 hover:bg-green-800 text-white cursor-pointer px-8 py-2 rounded-lg"
                                onClick={() => restart()}
                            >
                                Yes
                            </button>
                            <button className="text-neutral-600 hover:text-neutral-800 cursor-pointer underline">Go back to configs</button>
                        </div>
                    </div>
                )
            }
            {
                !isFinished && (
                    <>
                        <TopBar
                            isInfinite={isInfinite}
                            isFinished={isFinished}
                            currentQuestion={currentQuestion}
                            totalDone={totalDone}
                            totalQuestions={getTotalQuestions()}
                            playerStats={playerStats}
                            time={questions[currentQuestion].time}
                            handleTimeUp={handleTimeUp}
                        />
                        <div className="flex items-center justify-center h-[90vh] p-4 lg:p-0">
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 py-4 rounded-xl bg-white/90">
                                <p className="text-lg font-light">{questions[currentQuestion].preStatement}</p>
                                <h3 className="text-xl font-bold">{questions[currentQuestion].statement}</h3>
                                {/* statement and content */}
                                <div className="flex items-center justify-between gap-2 my-4">
                                    {
                                        contents.length > 1 && (
                                            <BsCaretLeftFill
                                                className="text-3xl cursor-pointer hover:scale-90"
                                                onClick={() => handlePreviousContent()}
                                            />
                                        )
                                    }
                                    <Content
                                        content={questions[currentQuestion].content[currentContent]}
                                    />
                                    {
                                        contents.length > 1 && (
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
                                        questions[currentQuestion].tips.map((t, i) => {
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
                            {/* alternatives and input */}
                            <div className="fixed bottom-0 w-full">
                                {
                                    mode.name == "click" && (
                                        <div className="flex">
                                            {
                                                questions[currentQuestion].options.map((o, i) => {
                                                    return (
                                                        <div
                                                            key={i}
                                                            className="w-full text-center py-4 border-r last:border-r-0 border-t border-b border-gray-300 text-white hover:opacity-90 cursor-pointer flex items-center justify-center"
                                                            onClick={() => handleAnswer(o)}
                                                            style={{ backgroundColor: DEFAULT_PALETTE[i < DEFAULT_PALETTE.length ? i : 0] }}
                                                        >
                                                            {o}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                                {
                                    mode.name == "type" && (
                                        <div className="w-full flex h-[10vh]">
                                            <input
                                                ref={inputRef}
                                                placeholder="Type your answer here..."
                                                type="text"
                                                className="w-[90%] py-4 px-2 text-center bg-white/90 focus:outline-0"
                                                value={typedAnswer}
                                                onChange={(e) => setTypedAnswer(e.target.value)}
                                            />
                                            <button
                                                ref={buttonRef}
                                                onClick={() => handleAnswer(typedAnswer)}
                                                className="flex justify-center items-center w-[10%] py-4 border-l bg-green-600 text-white hover:bg-green-800 cursor-pointer"
                                            >
                                                <BsSend />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}