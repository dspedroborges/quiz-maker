import { useState } from "react";
import Quiz from "./components/Quiz"
import Settings, { type SettingsType } from "./components/Settings";

// [{"category":"Verb to Be","preStatement":"Observe a frase.","statement":"Qual é a forma correta do verbo to be?","content":[{"type":"youtube","value":"https://www.youtube.com/watch?v=E0cUOqUVh0Y"}],"options":["am","is","are","be"],"answer":"am","time":100,"explanation":"I sempre usa am.","tips":["Lembre: I am."]},{"category":"Verb to Be","preStatement":"Complete a frase.","statement":"Escolha a forma correta.","content":[{"type":"text","value":"They ___ students."}],"options":["is","are","am","be"],"answer":"are","time":5,"explanation":"They usa are.","tips":["They = are."]},{"category":"Verb to Be","preStatement":"Analise a frase.","statement":"Qual forma completa corretamente?","content":[{"type":"text","value":"She ___ my friend."}],"options":["are","am","is","be"],"answer":"is","time":5,"explanation":"She usa is.","tips":["He/She/It = is."]},{"category":"Verb to Be","preStatement":"Preencha corretamente.","statement":"Escolha a alternativa correta.","content":[{"type":"text","value":"We ___ ready."}],"options":["is","be","are","am"],"answer":"are","time":5,"explanation":"We usa are.","tips":["We = are."]},{"category":"Verb to Be","preStatement":"Observe a estrutura.","statement":"Qual é a forma correta?","content":[{"type":"text","value":"He ___ a doctor."}],"options":["am","are","be","is"],"answer":"is","time":5,"explanation":"He usa is.","tips":["He/She/It = is."]}]

function App() {
  const [started, setStarted] = useState(false);
  const [settingsState, setSettingsState] = useState<SettingsType>({
    allQuestions: "",
    isInfinite: false,
    isRandom: false,
    take: 0,
    mode: "click",
    answersAsSuggestions: false
  });

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(https://picsum.photos/id/15/1080)` }}
    >
      {
        started ? (
          <Quiz
            allQuestions={JSON.parse(settingsState?.allQuestions)}
            isInfinite={settingsState.isInfinite}
            isRandom={settingsState.isRandom}
            take={settingsState.take}
            mode={{
              name: settingsState.mode,
              answersAsSuggestions: settingsState.answersAsSuggestions,
            }}
          />
        ) : (
          <Settings onSubmit={(s: SettingsType) => {
            setSettingsState(s);
            setStarted(true);
          }} />
        )
      }
    </div>
  )
}

export default App
