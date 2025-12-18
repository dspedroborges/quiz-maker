import type { SavedQuiz } from "../hooks/useQuiz";

// const INITIAL_QUESTION: Question | ClickQuestion | NonClickQuestion = {
//     category: "",
//     preStatement: "",
//     statement: "",
//     content: [],
//     options: [],
//     answer: "",
//     time: 0,
//     explanation: { type: "text", value: "" },
//     tips: [],
//     mode: { name: "click" }
// };

export default function CreateUpdateForm({ savedQuiz }: { savedQuiz?: SavedQuiz }) {
    console.log(savedQuiz);
    return (
        <>Being made</>
    )
}