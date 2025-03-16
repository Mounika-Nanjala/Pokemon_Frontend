import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./Pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
