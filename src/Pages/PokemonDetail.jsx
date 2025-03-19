import { getPokemon } from "../services/pokemonApi.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

const PokemonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roster, setRoster] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const pokemonData = await getPokemon(id);
        if (!pokemonData) {
          setError(`Pokémon with ID ${id} not found.`);
        } else {
          setData(pokemonData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [id]);

  const showToast = (message) => {
   
    console.log("Toast:", message); 
  };

  const addToRoster = (pokemon) => {
    if (!pokemon || !pokemon.name) return;
    const existingPokemon = localStorage.getItem(pokemon.name);

    if (existingPokemon) {
      showToast(`${pokemon.name} is already in the roster!`);
      return;
    }

    localStorage.setItem(pokemon.name, JSON.stringify(pokemon));
    setRoster((prevRoster) => [...prevRoster, pokemon]);
    showToast(`${pokemon.name} added to the roster!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      showToast("Error: No Pokémon ID found.");
      return;
    }

    try {
      addToRoster(data);
      navigate("/my-roster");
    } catch (error) {
      console.error(error);
      showToast("Error adding the Pokémon.");
    }
  };

  const isAlreadyInRoster = data && !!localStorage.getItem(data.name);

  if (loading)
    return <p className="text-white text-center">Loading Pokémon...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!data) return <p className="text-white text-center">No Pokémon found.</p>;

  return (
    <div className="flex flex-col bg-gray-900 text-black min-h-screen">
      <section className="items-center flex flex-col px-4 py-10">
        <div className="border border-light textLight rounded-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl p-5 bg-bgLight">
          <form
            onSubmit={handleSubmit}
            id="edit-form"
            className="items-center flex flex-col px-4 pb-8 gap-5"
          >
            <label className="input-custom gap-2 w-full">
              <span className="text-gray-300">Name:</span>
              <input
                value={data?.name || ""}
                name="name"
                className="grow w-full"
                placeholder="Name"
                readOnly
              />
            </label>
            <label className="input-custom gap-2 w-full">
              <span className="text-gray-300">Height:</span>
              <input
                value={data?.height || ""}
                name="height"
                className="grow w-full"
                readOnly
              />
            </label>
            <label className="input-custom gap-2 w-full">
              <span className="text-gray-300">Weight:</span>
              <input
                defaultValue={data?.weight || ""}
                name="weight"
                className="grow w-full"
                readOnly
              />
            </label>
            <label className="textarea-custom gap-2 w-full">
              <span className="text-gray-300">Types:</span>
              <textarea
                defaultValue={data?.types.join(", ") || ""}
                name="types"
                className="grow w-full bg-bgInput h-full"
                readOnly
              />
            </label>
            <label className="textarea-custom gap-2 w-full">
              <span className="text-gray-300">Abilities:</span>
              <textarea
                defaultValue={data?.abilities.join(", ") || ""}
                name="abilities"
                className="grow w-full bg-bgInput h-full"
                readOnly
              />
            </label>
            <div className="w-full flex justify-center">
              <img src={data.sprite} alt={data.name} className="w-32 h-32" />{" "}
            </div>
            <button
              id="submit-btn"
              type="submit"
              className={`bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition ${
                isAlreadyInRoster ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isAlreadyInRoster}
            >
              {isAlreadyInRoster ? "Already in Roster" : "Add"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PokemonDetail;
