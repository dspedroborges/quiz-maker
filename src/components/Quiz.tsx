import { useEffect, useRef, useState } from "react";
import { BsCaretLeftFill, BsCaretRightFill, BsCheckCircle, BsHandThumbsDown, BsHandThumbsUp, BsQuestionCircle, BsSend } from "react-icons/bs";
import { toast, Toaster } from "sonner";
import { normalizeString, shuffleArray } from "../utils/functions";
import { DEFAULT_PALETTE } from "../utils/colors";
import TopBar from "./TopBar";
import Content from "./Content";
import { Link } from "react-router-dom";
import TextDisplay from "./TextDisplay";

export type FileType = "text" | "image" | "audio" | "video" | "youtube";

export type ContentType = { type: FileType, value: string };

export type ModeType = { name: "click" } | { name: "type", answersAsSuggestions: boolean } | { name: "explanation" };

export type Question = {
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

type Props = {
    allQuestions: Question[];
    isInfinite: boolean;
    isRandom: boolean;
    take?: number;
};

export default function Quiz({ allQuestions, isInfinite, isRandom, take }: Props) {
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
    const [showExplanation, setShowExplanation] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const contents = questions[currentQuestion].content;
    // this state is to check if the user clicked on "I was right" or "I was wrong" before showing the button "Next question"
    const [gaveAnswer, setGaveAnswer] = useState(false);

    const setShuffled = () => {
        let pool = JSON.parse(JSON.stringify(questions));
        if (isRandom) {
            pool = shuffleArray(pool);
        }

        if (take) {
            pool = pool.slice(0, take);
        }

        console.log(pool[0].statement);

        setQuestions(pool);
    }

    useEffect(() => {
        setShuffled();
    }, [isFinished]);

    useEffect(() => {
        if (questions[currentQuestion].mode.name !== "type") return;

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
            if (isInfinite) {
                setShuffled();
                setCurrentQuestion(0);
            } else {
                toast.success("You've finished it!");
                playSound("finish");
                setIsFinished(true);
            }
        }

        setCurrentContent(0);
        setTotalDone(totalDone + 1);
        setTypedAnswer("");
        setShowExplanation(false);
        setGaveAnswer(false);
    }

    const updatePlayerStats = (right: boolean) => {
        let totalRight = right ? playerStats.totalRight + 1 : playerStats.totalRight;
        let performance = (totalRight / (totalDone + 1) * 100).toFixed(2) + "%";
        setPlayerStats({ totalRight, performance });
    }

    const handleAnswer = (answer: string) => {
        if (isFinished) return;

        let right = false;
        if (normalizeString(answer) == normalizeString(questions[currentQuestion].answer)) {
            toast.success("Good job!");
            playSound("right");
            right = true;
        } else {
            playSound("wrong");
            toast.error("Wrong answer!");
        }
        setShowExplanation(true);
        setGaveAnswer(true);
        updatePlayerStats(right);
    }

    const getTotalQuestions = () => {
        return take ? take : questions.length;
    }

    const handleTimeUp = () => {
        if (isFinished) return;
        playSound("timeout");
        toast.error("Time's up!");
        updatePlayerStats(false);
        setShowExplanation(true);

        if (questions[currentQuestion].mode.name !== "explanation") {
            setGaveAnswer(true);
        }
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
        setShowExplanation(false);
        setGaveAnswer(false);
        setPlayerStats({ totalRight: 0, performance: "0.00%" });
    }

    return (
        <div>
            <Toaster position="top-right" />
            {
                isFinished && (
                    <div className="bg-white rounded-xl w-1/2 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 flex flex-col gap-8 items-center justify-center">
                        <p className="text-xl text-green-800"><span className="font-bold">Congrats! </span>You've reached the end of it. Wanna try again?</p>
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
                            <Link to={"/"} className="text-neutral-600 hover:text-neutral-800 cursor-pointer underline">Go back to settings</Link>
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
                            handleTimeUp={questions[currentQuestion].mode.name !== "explanation" ? handleTimeUp : undefined}
                            showingExplanation={showExplanation}
                        />
                        <div className="flex items-center justify-center h-[90vh] p-4 lg:p-0">
                            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 rounded-2xl bg-white/90 shadow-6xl shadow-gray-600 border-4 border-neutral-600">
                                {/* statement and content */}
                                {
                                    !showExplanation && (
                                        <div className="flex flex-col justify-center items-center p-4 gap-4">
                                            <div>
                                                <p className="text-lg font-light mb-3 text-center">
                                                    <TextDisplay text={questions[currentQuestion].preStatement} />
                                                </p>
                                                <h3 className="text-xl font-bold text-center">
                                                    <TextDisplay text={questions[currentQuestion].statement} />
                                                </h3>
                                            </div>
                                            <div className="flex justify-between items-center">
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
                                    )
                                }
                                {/* explanation */}
                                {
                                    showExplanation && (
                                        <div className="text-center w-full">
                                            <div className="p-4">
                                                <h3 className="text-xl font-bold my-3 text-neutral-800">The right answer is:</h3>
                                                <p className="text-2xl italic mt-4 text-green-600">
                                                    <TextDisplay text={questions[currentQuestion].answer} />
                                                </p>
                                                {
                                                    questions[currentQuestion].explanation.value !== "" &&
                                                    <>
                                                        <h3 className="text-xl font-bold my-3 text-neutral-800">Explanation:</h3>
                                                        <Content
                                                            content={questions[currentQuestion].explanation}
                                                        />
                                                    </>
                                                }
                                            </div>
                                            {
                                                (!gaveAnswer && questions[currentQuestion].mode.name == "explanation") && (
                                                    <div className="w-full flex mt-4">
                                                        <button
                                                            onClick={() => handleAnswer("")}
                                                            className="w-1/2 py-4 bg-red-600 text-white hover:bg-red-800 cursor-pointer flex items-center gap-2 justify-center rounded-bl-xl"
                                                        >
                                                            <BsHandThumbsDown />
                                                            I was wrong
                                                        </button>
                                                        <button
                                                            onClick={() => handleAnswer(questions[currentQuestion].answer)}
                                                            className="w-1/2 py-4 bg-green-600 text-white hover:bg-green-800 cursor-pointer flex items-center gap-2 justify-center rounded-br-xl"
                                                        >
                                                            <BsHandThumbsUp />
                                                            I was right
                                                        </button>
                                                    </div>
                                                )
                                            }

                                            {
                                                gaveAnswer && (
                                                    <button
                                                        className="w-full py-4 bg-purple-950 text-white hover:bg-purple-900 cursor-pointer h-[10vh] rounded-b-xl"
                                                        onClick={() => handleNextQuestion()}
                                                    >
                                                        Next question
                                                    </button>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            {/* alternatives and input */}
                            <div className="fixed bottom-0 w-full">
                                {
                                    (questions[currentQuestion].mode.name == "click" && !showExplanation) && (
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
                                                            <TextDisplay text={o} />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                                {
                                    (questions[currentQuestion].mode.name == "type" && !showExplanation) && (
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

                                {
                                    (questions[currentQuestion].mode.name == "explanation" && !showExplanation) && (
                                        <div className="fixed bottom-0 w-full flex h-[10vh]">
                                            <button
                                                onClick={() => setShowExplanation(true)}
                                                className="w-full py-4 border-l bg-neutral-900 text-white hover:bg-neutral-800 cursor-pointer"
                                            >
                                                Show explanation
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