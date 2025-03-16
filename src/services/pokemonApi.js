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
