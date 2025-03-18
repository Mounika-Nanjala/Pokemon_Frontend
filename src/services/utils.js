export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 100) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
  const data = await response.json();
  console.log(data);
};

export const getLastBattlefieldKey = () => {
  const battlefieldKeys = Object.keys(localStorage)
    .filter((key) => key.startsWith("battlefield"))
    .map((key) => parseInt(key.replace("battlefield", ""), 10));

  return battlefieldKeys.length > 0 ? Math.max(...battlefieldKeys) : 0;
};
