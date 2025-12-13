import type { Question } from "../components/Quiz";

export type SavedQuiz = { quizName: string, allQuestions: Question[] };

const saveQuiz = (savedLs: SavedQuiz[], newData: { quizName: string, allQuestions: Question[] }) => {
    const { quizName, allQuestions } = newData;
    if (!quizName || !allQuestions) console.log({quizName, allQuestions});

    console.log("ok: ", {quizName, allQuestions});

    if (savedLs.length === 0) {
        localStorage.setItem("quizzes", JSON.stringify([{ quizName, allQuestions }]))
    } else {
        savedLs = savedLs.filter(quiz => quiz.quizName !== newData.quizName);
        localStorage.setItem("quizzes", JSON.stringify(
            [
                ...savedLs,
                { quizName, allQuestions }
            ]
        ))
    }
}

const deleteQuiz = (savedLs: SavedQuiz[], quizName: string) => {
    const newSavedLs = savedLs.filter(quiz => quiz.quizName !== quizName);
    localStorage.setItem("quizzes", JSON.stringify(newSavedLs));
}

export default function useQuiz() {
    let savedLs: any = localStorage.getItem("quizzes");
    return { saved: JSON.parse(savedLs) as SavedQuiz[] ?? [], saveQuiz, deleteQuiz };
}