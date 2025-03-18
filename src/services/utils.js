export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  console.log(data);
};
