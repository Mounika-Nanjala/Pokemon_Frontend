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
        const selectedPokemon = JSON.parse(localStorage.getItem("selectedPokemon"));

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
          { name: "Body Slam", damage: 15 }
        ];

        setPlayerPokemon(selectedPokemon);

        const enemyData = await fetchRandomPokemon();
        enemyData.hp = 100;
        enemyData.moves = [
          { name: "Scratch", damage: 10 },
          { name: "Pound", damage: 8 },
          { name: "Take Down", damage: 12 },
          { name: "Headbutt", damage: 15 }
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
    let baseDamage = Math.floor(Math.random() * (damageRange * 2)) + (move.damage - damageRange);

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

    log.push(`🔥 ${playerPokemon.name} used ${move.name}, dealing ${damageToEnemy} damage!`);

    if (newEnemyHp <= 0) {
      log.push(`💀 ${enemyPokemon.name} has fainted!`);
      setResult("You won! 🎉");
      setEnemyPokemon((prev) => ({ ...prev, hp: 0 }));
    } else {
      setEnemyPokemon((prev) => ({ ...prev, hp: newEnemyHp }));
      setBattleLog(log);
      setPlayerTurn(false);
      setTimeout(() => enemyAttack(log), 1000);
    }
  };

  const enemyAttack = (log) => {
    if (!playerPokemon || !enemyPokemon) return;

    const enemyMove = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)];
    const damageToPlayer = getRandomDamage(enemyMove);
    let newPlayerHp = Math.max(0, playerPokemon.hp - damageToPlayer);

    log.push(`💥 ${enemyPokemon.name} used ${enemyMove.name}, dealing ${damageToPlayer} damage!`);

    if (newPlayerHp <= 0) {
      log.push(`💀 ${playerPokemon.name} has fainted!`);
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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">⚔️ Pokémon Battle ⚔️</h1>

      {playerPokemon && enemyPokemon ? (
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Your Pokémon</h2>
            <img src={playerPokemon.sprite} alt={playerPokemon.name} className="w-32 mb-4" />
            <h2 className="text-xl">{playerPokemon.name}</h2>
            <HealthBar currentHp={playerPokemon.hp} maxHp={100} />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2">Enemy Pokémon</h2>
            <img src={enemyPokemon.sprite} alt={enemyPokemon.name} className="w-32 mb-4" />
            <h2 className="text-xl">{enemyPokemon.name}</h2>
            <HealthBar currentHp={enemyPokemon.hp} maxHp={100} />
          </div>
        </div>
      ) : (
        <p>Loading battle data...</p>
      )}

      {playerPokemon?.moves && !result && (
        <div className="mt-6 space-x-2">
          {playerPokemon.moves.map((move, index) => (
            <MoveButton key={index} move={move} handleAttack={handleAttack} />
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
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Go to My Roster
            </button>
            <button
              onClick={handleGoToLeaderboard}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
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
