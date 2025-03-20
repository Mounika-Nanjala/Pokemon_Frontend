import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import HealthBar from "../components/HealthBar";
import MoveButton from "../components/MoveButton";
import BattleLog from "../components/BattleLog";
import { fetchRandomPokemon } from "../services/utils";

const BattlePage = () => {
    const [playerPokemon, setPlayerPokemon] = useState(null);
    const [enemyPokemon, setEnemyPokemon] = useState(null);
    const [battleLog, setBattleLog] = useState([]);
    const [result, setResult] = useState(null);
    const [playerTurn, setPlayerTurn] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBattlePokemon = async () => {
            try {
                const selectedPokemon = JSON.parse(
                    localStorage.getItem("selectedPokemon")
                );

                if (!selectedPokemon) {
                    alert("No Pokémon selected! Please choose one.");
                    navigate("/my-roster");
                    return;
                }

                // Set balanced stats for both Pokémon
                selectedPokemon.hp = 100;
                selectedPokemon.moves = [
                    { name: "Tackle", damage: 10 },
                    { name: "Quick Attack", damage: 8 },
                    { name: "Slam", damage: 12 },
                    { name: "Body Slam", damage: 15 },
                ];

                setPlayerPokemon(selectedPokemon);

                const enemyData = await fetchRandomPokemon();
                enemyData.hp = 100;
                enemyData.moves = [
                    { name: "Scratch", damage: 10 },
                    { name: "Pound", damage: 8 },
                    { name: "Take Down", damage: 12 },
                    { name: "Headbutt", damage: 15 },
                ];
                setEnemyPokemon(enemyData);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            }
        };

        fetchBattlePokemon();
    }, [navigate]);

    const getRandomDamage = (move) => {
        const damageRange = move.damage * 0.3; // 30% variance
        let baseDamage =
            Math.floor(Math.random() * (damageRange * 2)) +
            (move.damage - damageRange);

        // 10% chance for a critical hit
        const isCriticalHit = Math.random() < 0.1;
        if (isCriticalHit) {
            baseDamage = Math.floor(baseDamage * 1.5);
        }

        return baseDamage;
    };

    const handleAttack = (move) => {
        if (!playerTurn || !playerPokemon || !enemyPokemon) return;

        let log = [...battleLog];

        const damageToEnemy = getRandomDamage(move);
        let newEnemyHp = Math.max(0, enemyPokemon.hp - damageToEnemy);

        log.push({
            text: `🔥 ${playerPokemon.name} used ${move.name}, dealing ${damageToEnemy} damage!`,
            type: "player",
        });

        if (newEnemyHp <= 0) {
            log.push({
                text: `💀 ${enemyPokemon.name} has fainted!`,
                type: "player",
            });
            setResult("You won! 🎉");
            setEnemyPokemon((prev) => ({ ...prev, hp: 0 }));

            // 🛠️ Score in Local Storage speichern
            localStorage.setItem("latestScore", JSON.stringify({ score: 100 }));
        } else {
            setEnemyPokemon((prev) => ({ ...prev, hp: newEnemyHp }));
            setBattleLog(log);
            setPlayerTurn(false);
            setTimeout(() => enemyAttack(log), 1000);
        }
    };

    const enemyAttack = (log) => {
        if (!playerPokemon || !enemyPokemon) return;

        const enemyMove =
            enemyPokemon.moves[
                Math.floor(Math.random() * enemyPokemon.moves.length)
            ];
        const damageToPlayer = getRandomDamage(enemyMove);
        let newPlayerHp = Math.max(0, playerPokemon.hp - damageToPlayer);

        log.push({
            text: `💥 ${enemyPokemon.name} used ${enemyMove.name}, dealing ${damageToPlayer} damage!`,
            type: "enemy",
        });

        if (newPlayerHp <= 0) {
            log.push({
                text: `💀 ${playerPokemon.name} has fainted!`,
                type: "enemy",
            });
            setResult("You lost! 😢");
            setPlayerPokemon((prev) => ({ ...prev, hp: 0 }));
        } else {
            setPlayerPokemon((prev) => ({ ...prev, hp: newPlayerHp }));
            setBattleLog(log);
            setPlayerTurn(true);
        }

        // Check for a tie
        if (newPlayerHp <= 0 && enemyPokemon.hp <= 0) {
            setResult("It's a tie! 🤝");
        }
    };

    const handleGoToMyRoster = () => {
        navigate("/my-roster");
    };

    const handleGoToLeaderboard = () => {
        navigate("/leaderboard");
    };

    return (
        <div className="flex flex-col items-center p-4">
            {/* Header */}
            <h1 className="text-4xl font-bold text-pokemon-accent mb-4">
                ⚔️ Pokémon Battle ⚔️
            </h1>

            {playerPokemon && enemyPokemon ? (
                <div className="">
                    <p className="text-lg text-center mb-6 mt-2 ">
                        Trainer, your{" "}
                        <span className="text-yellow-500 font-bold capitalize">
                            {playerPokemon.name}
                        </span>{" "}
                        is ready!{" "}
                        <span className="text-red-500 font-bold capitalize">
                            {" "}
                            {enemyPokemon.name}
                        </span>{" "}
                        won't go down easy!
                    </p>

                    {/* Battle Container */}
                    <div className="grid grid-cols-2 gap-8 max-w-4xl w-full">
                        {/* Your Pokémon */}
                        <div className="p-6 bg-pokemon-cardLight dark:bg-pokemon-cardDark rounded-xl text-center border border-gray-700 shadow-lg">
                            <img
                                src={playerPokemon.sprite}
                                alt={playerPokemon.name}
                                className="w-32 h-32 mx-auto animate-subtleBounce"
                            />
                            <h2 className="text-2xl font-bold mb-4 ">
                                Your Pokémon:{" "}
                                <span className=" text-pokemon-accent capitalize">
                                    {playerPokemon.name}
                                </span>
                            </h2>
                            <div className="bg-gray-700 rounded-full h-3 w-full mt-2 relative">
                                <HealthBar
                                    currentHp={playerPokemon.hp}
                                    maxHp={100}
                                />
                            </div>
                        </div>

                        {/* Enemy Pokémon */}
                        <div className="p-6 bg-pokemon-cardLight dark:bg-pokemon-cardDark rounded-xl text-center border border-gray-700 shadow-lg">
                            <img
                                src={enemyPokemon.sprite}
                                alt={enemyPokemon.name}
                                className="w-32 h-32 mx-auto animate-subtleBounce"
                            />
                            <h2 className="text-2xl font-bold mb-4 ">
                                Enemy Pokémon:{" "}
                                <span className="  text-red-400 capitalize">
                                    {enemyPokemon.name}
                                </span>
                            </h2>
                            <div className="bg-gray-700 rounded-full h-3 w-full mt-2 relative">
                                <HealthBar
                                    currentHp={enemyPokemon.hp}
                                    maxHp={100}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading battle data...</p>
            )}

            {playerPokemon?.moves && !result && (
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {playerPokemon.moves.map((move, index) => (
                        <MoveButton
                            key={index}
                            move={move}
                            handleAttack={handleAttack}
                        />
                    ))}
                </div>
            )}

            {result && (
                <>
                    <h2 className="text-2xl mt-4">{result}</h2>
                    {/* Show two buttons after the battle ends */}
                    <div className="mt-6 space-x-4">
                        <button
                            onClick={handleGoToMyRoster}
                            className="px-4 py-2 btn-custom">
                            Go to My Roster
                        </button>
                        <button
                            onClick={handleGoToLeaderboard}
                            className="px-4 py-2  btn-custom">
                            Go to Leaderboard
                        </button>
                    </div>
                </>
            )}

            <BattleLog log={battleLog} />
        </div>
    );
};

export default BattlePage;
