import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layout/MainLayout";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="pokemon/:id" element={<PokemonDetail />} />
                    <Route path="roster" element={<MyRoster />} />
                    <Route path="battle" element={<Battle />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
