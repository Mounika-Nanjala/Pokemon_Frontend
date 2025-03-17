// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./Pages/HomePage";
import PokemonDetail from "./Pages/PokemonDetail";
import MyRoster from "./Pages/MyRoster";
import Battle from "./Pages/Battle";
import Leaderboard from "./Pages/Leaderboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="pokemon/:id" element={<PokemonDetail />} />
                    <Route path="my-roster" element={<MyRoster />} />
                    <Route path="battle" element={<Battle />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
