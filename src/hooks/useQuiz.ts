import type { Question } from "../components/Quiz";

export type SavedQuiz = { quizName: string, allQuestions: Question[] };

const saveQuiz = (savedLs: SavedQuiz[]|undefined|null, newData?: { quizName: string, allQuestions: Question[] }) => {
    if (newData) {
        const { quizName, allQuestions } = newData;
        if (!savedLs) {
            localStorage.setItem("quizzes", JSON.stringify([{ quizName, allQuestions }]))
        } else {
            savedLs = savedLs.filter(quiz => quiz.quizName !== newData.quizName);
            localStorage.setItem("quizzes", JSON.stringify(
                [
                    ...savedLs,
                    {quizName, allQuestions}
                ]
            ))
        }
    }
}

const deleteQuiz = (savedLs: SavedQuiz[], quizName: string) => {
    const newSavedLs = savedLs.filter(quiz => quiz.quizName !== quizName);
    localStorage.setItem("quizzes", JSON.stringify(newSavedLs));
}

export default function useQuiz() {
    let savedLs: any = localStorage.getItem("quizzes");
    if (savedLs) {
        return { saved: JSON.parse(savedLs) as SavedQuiz[], saveQuiz, deleteQuiz };
    }
    return { saved: [], saveQuiz, deleteQuiz };
}