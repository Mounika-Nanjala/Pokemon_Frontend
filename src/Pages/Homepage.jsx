import Pokemons from "../components/Pokemons";
import { useState, useEffect } from "react";
//import { useOutletContext } from "react-router";
import { fetchAllPokemons } from "../services/pokemonApi.js";

const HomePage = () => {
  const [data, setData] = useState([]);
  //const { searchQuery } = useOutletContext();
  useEffect(() => {
    const allPokemons = async () => {
      try {
        const pokemonData = await fetchAllPokemons();
        console.log("Fetched pokemons:", pokemonData);
        setData(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    allPokemons();
  }, []);

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <Pokemons data={data} />
      </main>
    </div>
  );
};

export default HomePage;
