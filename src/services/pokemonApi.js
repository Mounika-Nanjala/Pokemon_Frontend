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
