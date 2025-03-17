import { useState, useEffect } from "react";
import { fetchRandomPokemon } from "../services/pokemonApi";
import { useNavigate } from "react-router";

const BattlePage = () => {
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBattlePokemon = async () => {
      try {
        // Fetch a random enemy Pokémon
        const enemyData = await fetchRandomPokemon();
        setEnemyPokemon(enemyData);

        // Get a random Pokémon from the player's roster 
        const savedRoster = JSON.parse(localStorage.getItem("roster")) || [];
        if (savedRoster.length > 0) {
          const randomPlayerPokemon =
            savedRoster[Math.floor(Math.random() * savedRoster.length)];
          setPlayerPokemon(randomPlayerPokemon);
        } else {
          alert("No Pokémon in roster! Add some first.");
          navigate("/my-roster");
        }
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    };

    fetchBattlePokemon();
  }, [navigate]);

  const startBattle = () => {
    if (!playerPokemon || !enemyPokemon) return;

    const playerAttack = playerPokemon.stats.attack;
    const enemyAttack = enemyPokemon.stats.attack;

    if (playerAttack > enemyAttack) {
      setResult("You won! 🎉");
    } else if (playerAttack < enemyAttack) {
      setResult("You lost! 😢");
    } else {
      setResult("It's a draw! 🤝");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">⚔️ Pokémon Battle ⚔️</h1>

      {playerPokemon && enemyPokemon ? (
        <div className="grid grid-cols-2 gap-8">
          {/* Player's Pokémon */}
          <div className="text-center border p-4 rounded-lg">
            <h2 className="text-xl">{playerPokemon.name}</h2>
            <img src={playerPokemon.sprite} alt={playerPokemon.name} className="w-32 mx-auto" />
            <p>Attack: {playerPokemon.stats.attack}</p>
          </div>

          {/* Enemy Pokémon */}
          <div className="text-center border p-4 rounded-lg">
            <h2 className="text-xl">{enemyPokemon.name}</h2>
            <img src={enemyPokemon.sprite} alt={enemyPokemon.name} className="w-32 mx-auto" />
            <p>Attack: {enemyPokemon.stats.attack}</p>
          </div>
        </div>
      ) : (
        <p>Loading battle data...</p>
      )}

      <button
        onClick={startBattle}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg"
      >
        Start Battle
      </button>

      {result && <h2 className="mt-4 text-2xl">{result}</h2>}
    </div>
  );
};

export default BattlePage;
