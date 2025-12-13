import Settings, { type SettingsType } from "../components/Settings";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";
import { URL_PATTERN } from "../utils/colors";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen bg-neutral-500"
      style={{ backgroundImage: URL_PATTERN }}
    >
      <Nav />
      <div className="mt-4">
        <Settings onSubmit={(s: SettingsType) => {
          console.log({s});
          navigate("/quiz", {
            state: s
          });
        }} />
      </div>
    </div>
  )
}
