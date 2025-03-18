import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router";
//import { fetchAllPokemons } from "../services/postsApi";

const Pokemons = ({ data }) => {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  // Ensure `data` is safely assigned
  useEffect(() => {
    if (Array.isArray(data)) {
      setCards(data);
    } else {
      setCards([]);
    }
  }, [data]);

  // Handle edit navigation
  const onEdit = (key) => {
    if (!key) return;
    navigate(`/edit/${key}`);
  };

  return (
    <div>
      <div
        id="items-list"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
      >
        {cards.map((item) => (
          <PokemonCard
            key={item.id}
            id={item.id}
            name={item.name}
            url={item.imageUrl}
            stats={item.stats || []}
            onEdit={() => onEdit(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
