import type { Question } from "../components/Quiz";

export type SavedQuiz = { quizName: string, allQuestions: Question[] };

const saveQuiz = (savedLs: SavedQuiz[], newData: { quizName: string, allQuestions: Question[] }) => {
    const { quizName, allQuestions } = newData;
    console.log({newData});
    console.log({savedLs});
    if (savedLs.length === 0) {
        console.log("not saved before");
        localStorage.setItem("quizzes", JSON.stringify([{ quizName, allQuestions }]))
    } else {
        console.log("saved before");
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