import { getPokemon } from "../services/pokemonApi.js";
import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router";

const PokemonDetail = () => {
  const { id } = useParams();
  console.log("Detail page:", id);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      console.log("use effect id:", id);

      if (!id) {
        setError("No Pokemon ID provided.");
        setLoading(false);
        return;
      }

      try {
        const pokemonData = await getPokemon(id);
        console.log("Pokemon data:", pokemonData);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      alert("Error: No pokemon ID found.");
      return;
    }
    //TODO: add to Mongo DB
    alert("Pokemon added to the list!");
  };
  if (loading)
    return <p className="text-white text-center">Loading Pokémon...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!data) return <p className="text-white text-center">No Pokémon found.</p>;
  console.log("data:", data.name, data.height, data.weight);
  return (
    <div className="flex flex-col bg-gray-900 text-white min-h-screen">
      <section className="items-center flex flex-col px-4 py-10">
        <div className="border border-light textLight rounded-xl w-full max-w-lg md:max-w-xl lg:max-w-2xl p-5 bg-bgLight">
          <form
            onSubmit={handleSubmit}
            id="edit-form"
            className="items-center flex flex-col px-4 pb-8 gap-5"
          >
            <label className="input-custom gap-2 w-full">
              <input
                defaultValue={data.name}
                name="name"
                className="grow w-full"
                placeholder="Name"
                readOnly
              />
            </label>
            <label className="input-custom gap-2 w-full">
              <input
                defaultValue={String(data.height)}
                name="height"
                className="grow w-full"
                readOnly
              />
            </label>
            <label className="input-custom gap-2 w-full">
              <input
                defaultValue={String(data.weight)}
                name="weight"
                className="grow w-full"
                readOnly
              />
            </label>

            <label className="textarea-custom gap-2 w-full">
              <textarea
                defaultValue={data.types.join(", ")}
                name="types"
                className="grow w-full bg-bgInput h-full"
                readOnly
              />
            </label>
            <label className="textarea-custom gap-2 w-full">
              <textarea
                defaultValue={data.abilities.join(", ")}
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
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 rounded-lg transition"
            >
              Add
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default PokemonDetail;
