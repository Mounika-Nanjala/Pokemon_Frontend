import { useEffect, useState } from "react";
import { FaTrash, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router";
import { getLastBattlefieldKey } from "../services/utils";

const MyRoster = () => {
  const [roster, setRoster] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const storedRoster = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const item = localStorage.getItem(key);

      // Check if the item is a valid JSON string
      if (
        item &&
        !key.includes("battlefield") &&
        item.startsWith("{") &&
        item.endsWith("}")
      ) {
        try {
          const pokemonData = JSON.parse(item);
          if (pokemonData && pokemonData.name) {
            storedRoster.push(pokemonData);
          }
        } catch (error) {
          console.error(`Error parsing JSON for key "${key}":`, error);
        }
      }
    }

    setRoster(storedRoster);
  }, []);
  console.log("Roster:", roster);

  const handleDelete = (pokemonName) => {
    try {
      const item = localStorage.getItem(pokemonName);
      if (!item) {
        alert(`${pokemonName} are not in the roster!`);
        return;
      }

      localStorage.removeItem(pokemonName);
      setRoster(roster.filter((pokemon) => pokemon.name !== pokemonName));
      alert(`${pokemonName} deleted from the roster!`);
    } catch (error) {
      console.error(error);
      alert("Error deleting the Pokémon.");
    }
  };

  const handleSelect = (pokemon) => {
    try {
      const lastNumber = getLastBattlefieldKey();
      const nextKey = `battlefield${lastNumber + 1}`;
      localStorage.setItem(nextKey, JSON.stringify(pokemon));
      navigate("/battle");
    } catch (error) {
      console.error(error);
      alert("Error by selecting a pokemon.");
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-center text-2xl mb-4">Pokémon Roster</h2>
      {roster.length === 0 ? (
        <p className="text-center text-gray-400">No Pokémon in roster yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roster.map((pokemon, index) => (
            <li key={index} className="p-4 border border-gray-500 rounded-lg">
              <h3 className="text-xl">{pokemon.name}</h3>
              <p>Height: {pokemon.height}</p>
              <p>Weight: {pokemon.weight}</p>
              <p>Types: {pokemon.types}</p>
              <p>Abilities: {pokemon.abilities}</p>
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className="w-24 h-24 mt-2"
              />
              <div className="flex gap-2 mt-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(pokemon.name)}
                >
                  <FaTrash className="inline-block" /> Delete
                </button>
                <button
                  className="text-green-500 hover:text-green-700"
                  onClick={() => handleSelect(pokemon)}
                >
                  <FaCaretDown className="inline-block" /> Select
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRoster;
