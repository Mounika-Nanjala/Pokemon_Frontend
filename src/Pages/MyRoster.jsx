import { useEffect, useState } from "react";
//sketch of roster page
//TODO: check after binding PokemonDetail page and MyRoster page
const MyRoster = () => {
  const [roster, setRoster] = useState([]);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/roster");
        const data = await response.json();
        setRoster(data);
      } catch (error) {
        console.error("Error fetching roster:", error);
      }
    };

    fetchRoster();
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-center text-2xl mb-4">Pokémon Roster</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roster.map((pokemon) => (
          <li
            key={pokemon._id}
            className="p-4 border border-gray-500 rounded-lg"
          >
            <h3 className="text-xl">{pokemon.name}</h3>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {pokemon.types.join(", ")}</p>
            <p>Abilities: {pokemon.abilities.join(", ")}</p>
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-24 h-24 mt-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyRoster;
