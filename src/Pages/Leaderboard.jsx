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
        <div className="max-w-3xl mx-auto p-6 bg-pokemon-cardLight dark:bg-pokemon-cardDark ">
            <h1 className="text-3xl font-bold text-center mb-6 text-pokemon-accent">
                🏆 Leaderboard
            </h1>

            {/* Leaderboard table */}
            <div className="overflow-x-auto  border border-gray-700 shadow-lg rounded-lg text-white">
                <table className="w-full border-collapse  overflow-hidden">
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

            {/* Form to submit score */}
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
        </div>
    );
};

export default Leaderboard;
