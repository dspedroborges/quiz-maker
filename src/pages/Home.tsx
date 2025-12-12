import Settings, { type SettingsType } from "../components/Settings";
import Nav from "../components/Nav";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(https://picsum.photos/id/15/1080)` }}
    >
      <Nav />
      <div className="mt-4">
        <Settings onSubmit={(s: SettingsType) => {
          navigate("/quiz", {
            state: s
          });
        }} />
      </div>
    </div>
  )
}
