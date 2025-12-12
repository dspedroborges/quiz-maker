import Nav from "../components/Nav";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "../components/Quiz";
import { useEffect } from "react";

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
            className="bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(https://picsum.photos/id/77/1780)` }}
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