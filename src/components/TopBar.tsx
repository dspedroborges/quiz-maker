import { BsCheckCircleFill, BsClockFill, BsGraphUp, BsInfinity } from "react-icons/bs";
import { Timer } from "./Timer";

type Props = {
    isInfinite: boolean;
    isFinished: boolean;
    currentQuestion: number;
    totalDone: number;
    totalQuestions: number;
    showingExplanation: boolean;
    playerStats: {
        totalRight: number;
        performance: string;
    };
    time: number;
    handleTimeUp?: () => void;
}

export default function TopBar({ isInfinite, isFinished, currentQuestion, totalDone, totalQuestions, showingExplanation, playerStats, time, handleTimeUp }: Props) {
    return (
        <div className="px-4 h-12 bg-neutral-800 flex justify-between text-white items-center shadow-2xl">
            {
                !isInfinite ? (
                    <div>
                        {totalDone + 1} / {totalQuestions}
                    </div>
                ) : (
                    <BsInfinity />
                )
            }

            <div className="flex items-center gap-2">
                <BsCheckCircleFill />
                {playerStats.totalRight}
            </div>

            <div className="flex items-center gap-2">
                <BsGraphUp />
                {playerStats.performance}
            </div>
            {
                (handleTimeUp && !isFinished && !showingExplanation) && (
                    <div className="flex items-center gap-2">
                        <BsClockFill />
                        <Timer
                            key={currentQuestion}
                            seconds={time}
                            onFinish={handleTimeUp}
                        />
                    </div>
                )
            }

        </div>
    )
}