import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [username, setUsername] = useState("");
    const [score, setScore] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch leaderboard
    const fetchLeaderboard = async () => {
        try {
            const res = await fetch("http://localhost:5000");
            if (!res.ok) throw new Error("Failed to fetch leaderboard.");
            setLeaderboard(await res.json());
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    useEffect(() => {
        const savedScore = JSON.parse(localStorage.getItem("latestScore"));
        if (savedScore) {
            setScore(savedScore.score);
        }
    }, []);

    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        const scoreToSubmit = parseInt(score, 10);
        if (isNaN(scoreToSubmit)) {
            setErrorMessage("Invalid score value.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, score: scoreToSubmit }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to submit score");
            }

            setSuccessMessage(
                data.updatedScore
                    ? `🎉 Score updated! New score: ${data.updatedScore}`
                    : `🎉 New player added!`
            );

            setUsername("");
            setScore("");
            localStorage.removeItem("latestScore");
            await fetchLeaderboard();
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-pokemon-cardLight dark:bg-pokemon-cardDark">
            <h1 className="text-3xl font-bold text-center mb-6 text-pokemon-accent">
                🏆 Leaderboard
            </h1>

            {/* Error message */}
            {errorMessage && (
                <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            {/* Leaderboard Table */}
            <div className="overflow-x-auto border border-gray-700 shadow-lg rounded-lg text-white">
                <table className="w-full border-collapse overflow-hidden">
                    <thead>
                        <tr className="text-lg bg-pokemon-darkBg">
                            <th className="p-3">🏅 Rank</th>
                            <th className="p-3">Player</th>
                            <th className="p-3">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard
                            .sort((a, b) => b.score - a.score)
                            .map((player, index) => (
                                <tr
                                    key={player._id}
                                    className={`text-center text-lg text-black ${
                                        index % 2 === 0
                                            ? "bg-zinc-200"
                                            : "bg-zinc-400"
                                    }`}>
                                    <td className="p-3 font-bold">
                                        {index === 0
                                            ? "🥇"
                                            : index === 1
                                            ? "🥈"
                                            : index === 2
                                            ? "🥉"
                                            : index + 1}
                                    </td>
                                    <td className="p-3">{player.username}</td>
                                    <td className="p-3">{player.score}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {/* Form to add score */}
            <form
                onSubmit={handleSubmit}
                className="mt-6 p-4 border border-gray-700 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4">
                    Submit Your Score
                </h2>
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="p-3 rounded-lg bg-transparent border border-gray-700 text-white text-lg"
                    />
                    <input
                        type="number"
                        placeholder="Enter Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                        className="p-3 rounded-lg bg-transparent border border-gray-700 text-white text-lg"
                    />
                    <button type="submit" className="btn-custom py-3 text-lg">
                        Submit Score
                    </button>
                </div>
            </form>
            {/* Sucess Message */}
            {successMessage && (
                <p className="text-green-500 text-center pt-10">
                    {successMessage}
                </p>
            )}
        </div>
    );
};

export default Leaderboard;
