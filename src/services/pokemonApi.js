export const fetchAllPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    const detailedPokemons = await Promise.all(
      data.results.map(async (item) => {
        const res = await fetch(item.url); //  details
        const pokemonData = await res.json();
        const imageUrl = pokemonData.sprites.front_default; //image URL
        return {
          id: pokemonData.id,
          name: item.name,
          imageUrl: imageUrl,
        };
      })
    );
    return detailedPokemons;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPokemon = async (id) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      console.warn(
        `Pokemon with ID ${id} not found (Status: ${response.status})`
      );
      return null;
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
// pokemonApi.js
export const fetchRandomPokemon = async () => {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; // Random ID between 1 and 898 (current # of Pokémon)
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!response.ok) {
      console.warn(`Pokemon with ID ${randomId} not found (Status: ${response.status})`);
      return null;
    }
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map((t) => t.type.name),
      abilities: data.abilities.map((a) => a.ability.name),
      sprite: data.sprites.front_default,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

//TODO: probably the path must be changed ???
export const addToList = async () => {
  await fetch("http://localhost:5000/api/roster", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types,
      abilities: data.abilities,
      sprite: data.sprite,
    }),
  });
};
