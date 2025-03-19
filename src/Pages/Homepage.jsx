import Pokemons from "../components/Pokemons";
import { useState, useEffect } from "react";
//import { useOutletContext } from "react-router";
import { fetchAllPokemons, getPokemonStats } from "../services/pokemonApi.js";

const HomePage = () => {
  const [data, setData] = useState([]);
  //const { searchQuery } = useOutletContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const allPokemons = async () => {
      try {
        const pokemonData = await fetchAllPokemons();
        console.log("Fetched pokemons:", pokemonData);
        const stats = await Promise.all(
          pokemonData.map(async (pokemon) => {
            const statData = await getPokemonStats(pokemon.id);
            return { ...pokemon, stats: statData };
          })
        );

        console.log("Fetched pokemons with stats:", stats);
        setData(stats);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    allPokemons();
  }, []);
  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemons = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <main className="flex-grow container mx-auto p-4">
        <Pokemons data={currentPokemons} />

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentPage === 1
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Previous
          </button>

          <span className="text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
