import { useEffect, useState } from "react";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [username, setUsername] = useState("");
    const [score, setScore] = useState("");

    // Fetch leaderboard
    const fetchLeaderboard = async () => {
        try {
            const res = await fetch("http://localhost:5000");
            setLeaderboard(await res.json());
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, score: parseInt(score, 10) }),
            });

            if (!res.ok) throw new Error("Failed to submit score");

            setUsername("");
            setScore("");
            await fetchLeaderboard();
        } catch (error) {
            console.error("Error submitting score:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>

            {/* Leaderboard table*/}
            <table className="w-full border-collapse border border-gray-600">
                <thead>
                    <tr className="bg-gray-700 text-white">
                        <th className="p-2 border border-gray-600">Rank</th>
                        <th className="p-2 border border-gray-600">Player</th>
                        <th className="p-2 border border-gray-600">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard
                        .sort((a, b) => b.score - a.score)
                        .map((player, index) => (
                            <tr
                                key={player._id}
                                className="text-center bg-gray-800 text-white">
                                <td className="p-2 border border-gray-600">
                                    {index + 1}
                                </td>
                                <td className="p-2 border border-gray-600">
                                    {player.username}
                                </td>
                                <td className="p-2 border border-gray-600">
                                    {player.score}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* Form to submit score */}
            <form
                onSubmit={handleSubmit}
                className="mt-4 p-4 bg-gray-700 text-white rounded">
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="p-2 rounded bg-gray-800 border border-gray-600"
                    />
                    <input
                        type="number"
                        placeholder="Enter Score"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                        className="p-2 rounded bg-gray-800 border border-gray-600"
                    />
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded">
                        Submit Score
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Leaderboard;
