
export const fetchRandomPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + Math.floor(Math.random() * 150 + 1));
  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    sprite: data.sprites.front_default,
    hp: data.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 100,
    stats: {
      attack: data.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 50,
      defense: data.stats.find((stat) => stat.stat.name === "defense")?.base_stat || 50,
    },
    moves: data.moves.length
      ? data.moves.slice(0, 4).map((move) => ({
          name: move.move.name,
          damage: Math.floor(Math.random() * 50 + 10),
        }))
      : [{ name: "Tackle", damage: 10 }],
  };
};

export const getLastBattlefieldKey = () => {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("battlefield"));
  return keys.length ? parseInt(keys[keys.length - 1].replace("battlefield", "")) : 0;
};