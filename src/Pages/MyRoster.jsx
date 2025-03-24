import { useEffect, useState } from "react";
import { FaTrash, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router";
// import { getLastBattlefieldKey } from "../services/utils";
import { GiBroadsword, GiShield, GiHeartPlus } from "react-icons/gi";
import { Trash2, Zap } from "lucide-react";

const MyRoster = () => {
    const [roster, setRoster] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedRoster = [];

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const item = localStorage.getItem(key);

            if (
                item &&
                !key.includes("battlefield") &&
                !key.includes("selectedPokemon") &&
                item.startsWith("{") &&
                item.endsWith("}")
            ) {
                try {
                    const pokemonData = JSON.parse(item);
                    if (pokemonData && pokemonData.name) {
                        storedRoster.push(pokemonData);
                    }
                } catch (error) {
                    console.error(
                        `Error parsing JSON for key "${key}":`,
                        error
                    );
                }
            }
        }

        setRoster(storedRoster);
    }, []);

    console.log("Roster:", roster);

    const handleDelete = (pokemonName) => {
        try {
            const item = localStorage.getItem(pokemonName);
            if (!item) {
                alert(`${pokemonName} is not in the roster!`);
                return;
            }
            localStorage.removeItem(pokemonName);
            setRoster(roster.filter((pokemon) => pokemon.name !== pokemonName));
            alert(`${pokemonName} deleted from the roster!`);
        } catch (error) {
            console.error(error);
            alert("Error deleting the Pokémon.");
        }
    };

    const handleSelect = (pokemon) => {
        try {
            localStorage.setItem("selectedPokemon", JSON.stringify(pokemon));
            navigate("/battle");
        } catch (error) {
            console.error(error);
            alert("Error selecting the Pokémon.");
        }
    };

    const getStatIcon = (stat) => {
        switch (stat) {
            case "hp":
                return <GiHeartPlus size={18} className="text-red-400" />;
            case "attack":
                return <GiBroadsword size={18} className="text-green-400" />;
            case "defense":
                return <GiShield size={18} className="text-blue-400" />;
            default:
                return null;
        }
    };

    const getStatColor = (stat) => {
        switch (stat) {
            case "hp":
                return "bg-red-500";
            case "attack":
                return "bg-green-500";
            case "defense":
                return "bg-blue-500";
            default:
                return "bg-gray-400";
        }
    };

    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-4xl font-bold text-pokemon-accent drop-shadow-lg">
                Pokémon Roster
            </h2>
            <p className="text-lg text-black dark:text-white mt-2">
                Choose your champion, step onto the battlefield, and fight for
                victory!
            </p>

            {roster.length === 0 ? (
                <p className="text-center text-gray-400 mt-4">
                    No Pokémon in roster yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mt-6">
                    {roster.map((pokemon, index) => (
                        <div
                            key={index}
                            className="p-6 border border-gray-500 bg-pokemon-cardLight dark:bg-pokemon-cardDark rounded-xl shadow-md text-center">
                            {/* Pokémon image */}
                            <div className="flex justify-center">
                                <img
                                    src={pokemon.sprite}
                                    alt={pokemon.name}
                                    className="w-24 h-24 mx-auto animate-subtleBounce"
                                />
                            </div>

                            {/* Name */}
                            <h2 className="text-center text-2xl font-bold text-yellow-500 capitalize mt-4">
                                {pokemon.name}
                            </h2>

                            {/* Basic information */}
                            <div className="mt-4 space-y-2 text-center">
                                <p>
                                    <span className="font-semibold">
                                        Height:
                                    </span>{" "}
                                    {pokemon.height} |{" "}
                                    <span className="font-semibold">
                                        Weight:
                                    </span>{" "}
                                    {pokemon.weight}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Types:
                                    </span>{" "}
                                    {pokemon.types?.join(", ")}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Abilities:
                                    </span>{" "}
                                    {pokemon.abilities?.join(", ")}
                                </p>
                            </div>

                            {/* Stats (HP, Attack, Defense) */}
                            <div className="mt-4 space-y-3">
                                {(pokemon.stats || [])
                                    .filter((stat) =>
                                        ["hp", "attack", "defense"].includes(
                                            stat.name
                                        )
                                    )
                                    .map((stat) => (
                                        <div
                                            key={stat.name}
                                            className="flex items-center gap-2">
                                            {/* Label with Icon */}
                                            <span className="text-sm font-semibold flex items-center gap-1 w-24">
                                                {getStatIcon(stat.name)}{" "}
                                                {stat.name.toUpperCase()}
                                            </span>

                                            {/* Progress Bar */}
                                            <div className="relative flex-1 h-3 bg-gray-700 dark:bg-gray-600 rounded-lg overflow-hidden">
                                                <div
                                                    className={`absolute left-0 h-full rounded-lg ${getStatColor(
                                                        stat.name
                                                    )} transition-all duration-300`}
                                                    style={{
                                                        width: `${
                                                            (stat.value / 150) *
                                                            100
                                                        }%`,
                                                    }}></div>
                                            </div>

                                            {/* Value */}
                                            <span className="text-sm font-semibold w-8 text-right">
                                                {stat.value}
                                            </span>
                                        </div>
                                    ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-center gap-3 mt-4">
                                <button
                                    className="btn-red"
                                    onClick={() => handleDelete(pokemon.name)}>
                                    <Trash2 />
                                </button>
                                <button
                                    className="btn-custom"
                                    onClick={() => handleSelect(pokemon)}>
                                    <Zap />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRoster;
