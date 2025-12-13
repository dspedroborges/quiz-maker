import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Update from "./pages/Update";
import QuizPage from "./pages/Quiz";
import Import from "./pages/Import";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<Update />} />
          <Route path="/import" element={<Import />} />
          <Route path="/quiz" element={<QuizPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>

  );
}

export default App;