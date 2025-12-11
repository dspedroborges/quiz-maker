import { useState } from "react";
import Quiz from "../components/Quiz"
import Settings, { type SettingsType } from "../components/Settings";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [settingsState, setSettingsState] = useState<SettingsType>({
    allQuestions: "",
    isInfinite: false,
    isRandom: false,
    take: 0,
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
