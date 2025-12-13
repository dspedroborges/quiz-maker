import Nav from "../components/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "../components/Quiz";
import { useEffect } from "react";
import { URL_PATTERN } from "../utils/colors";

export default function QuizPage() {
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!state || !state.allQuestions) {
            navigate("/", { replace: true });
        }
    }, [state, navigate]);

    if (!state || !state.allQuestions) return null;

    return (
        <div
            className="min-h-screen bg-neutral-500"
            style={{ backgroundImage: URL_PATTERN }}
        >
            <Nav />
            <Quiz
                allQuestions={state.allQuestions}
                isInfinite={state.isInfinite}
                isRandom={state.isRandom}
                take={state.take}
            />
        </div>
    )
}