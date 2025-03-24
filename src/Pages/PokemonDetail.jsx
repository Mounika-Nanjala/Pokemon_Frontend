import { getPokemon } from "../services/pokemonApi.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { GiBroadsword, GiShield, GiHeartPlus } from "react-icons/gi";
import {
    House,
    ArrowRightFromLine,
    ArrowLeftFromLine,
    Plus,
} from "lucide-react";

const MAX_POKEMON = 150;

const PokemonDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [prevPoke, setPrevPoke] = useState(null);
    const [nextPoke, setNextPoke] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const pokemonData = await getPokemon(id);
                if (!pokemonData) {
                    setError(`Pokémon with ID ${id} not found.`);
                } else {
                    setData(pokemonData);

                    // Prev and next name
                    if (id > 1) {
                        const prevData = await getPokemon(Number(id) - 1);
                        setPrevPoke(prevData);
                    } else {
                        setPrevPoke(null);
                    }

                    if (id < MAX_POKEMON) {
                        const nextData = await getPokemon(Number(id) + 1);
                        setNextPoke(nextData);
                    } else {
                        setNextPoke(null);
                    }
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPokemonData();
    }, [id]);

    if (loading)
        return <p className="text-white text-center">Loading Pokémon...</p>;
    if (error) return <p className="text-red-500 text-center">{error}</p>;
    if (!data)
        return <p className="text-white text-center">No Pokémon found.</p>;

    const { name, height, weight, types, abilities, sprite, stats } = data;

    //  Stats
    const getStatDetails = (statName) => {
        switch (statName) {
            case "attack":
                return {
                    color: "bg-green-500",
                    icon: <GiBroadsword size={20} />,
                    label: "Attack",
                };
            case "defense":
                return {
                    color: "bg-blue-500",
                    icon: <GiShield size={20} />,
                    label: "Defense",
                };
            case "hp":
                return {
                    color: "bg-red-500",
                    icon: <GiHeartPlus size={20} />,
                    label: "Health",
                };
            default:
                return {
                    color: "bg-gray-400",
                    icon: null,
                    label: statName.toUpperCase(),
                };
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-pokemon-lightBg text-black dark:bg-pokemon-darkBg dark:text-white transition-all p-6">
            {/* Headline */}
            <h1 className="text-4xl font-bold text-pokemon-accent drop-shadow-lg">
                Welcome to Pokémon Battle!
            </h1>

            {/* Description */}
            <p className="text-lg text-black dark:text-white mt-2 mb-6 tracking-wide">
                Pick{" "}
                <span className="text-pokemon-accent font-bold capitalize">
                    {name}
                </span>
                , build your ultimate roster, and challenge others to rise to
                the top of the leaderboard!
            </p>

            <div className="max-w-lg w-full bg-pokemon-cardLight dark:bg-pokemon-cardDark shadow-lg rounded-xl p-6 border border-gray-300 dark:border-gray-700">
                {/* Pokémon image */}
                <div className="flex justify-center">
                    <img
                        src={sprite}
                        alt={name}
                        className="w-32 h-32 animate-subtleBounce"
                    />
                </div>

                {/* Name */}
                <h2 className="text-center text-2xl font-bold text-yellow-500 capitalize mt-4">
                    {name}
                </h2>

                {/* Bascis Infos */}
                <div className="mt-4 space-y-2 text-center">
                    <p>
                        <span className="font-semibold">Height:</span> {height}{" "}
                        | <span className="font-semibold">Weight:</span>{" "}
                        {weight}
                    </p>
                    <p>
                        <span className="font-semibold">Types:</span>{" "}
                        {types?.join(", ")}
                    </p>
                    <p>
                        <span className="font-semibold">Abilities:</span>{" "}
                        {abilities?.join(", ")}
                    </p>
                </div>

                {/* Stats */}
                <div className="mt-4 space-y-3">
                    {stats
                        .filter(
                            (stat) =>
                                ![
                                    "special-attack",
                                    "special-defense",
                                    "speed",
                                ].includes(stat.name)
                        )
                        .map((stat) => {
                            const { color, icon, label } = getStatDetails(
                                stat.name
                            );
                            return (
                                <div
                                    key={stat.name}
                                    className="flex items-center gap-2">
                                    <span className="text-sm font-semibold flex items-center gap-1 w-24">
                                        {icon} {label}
                                    </span>
                                    <div className="relative flex-1 h-3 bg-gray-700 dark:bg-gray-600 rounded-lg overflow-hidden">
                                        <div
                                            className={`absolute left-0 h-full rounded-lg ${color} transition-all duration-300`}
                                            style={{
                                                width: `${
                                                    (stat.value / 150) * 100
                                                }%`,
                                            }}></div>
                                    </div>
                                    <span className="text-sm font-semibold w-8 text-right">
                                        {stat.value}
                                    </span>
                                </div>
                            );
                        })}
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center">
                    <button
                        className="py-2 px-4 btn-custom"
                        onClick={() => {
                            const existingPokemon = localStorage.getItem(name);

                            if (existingPokemon) {
                                alert(`${name} is already in your roster!`);
                            } else {
                                localStorage.setItem(
                                    name,
                                    JSON.stringify(data)
                                );
                                alert(`${name} added to your roster!`);
                                navigate("/my-roster");
                            }
                        }}>
                        <Plus />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-row justify-between pt-8 w-full max-w-lg">
                <Link
                    to="/"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="btn-custom">
                    <House />
                </Link>
                <div className="flex flex-row gap-10">
                    {prevPoke && (
                        <button
                            onClick={() => navigate(`/pokemon/${prevPoke.id}`)}
                            className="flex items-center gap-2 btn-custom">
                            <ArrowLeftFromLine />
                            <p>Previous: {prevPoke.name}</p>
                        </button>
                    )}
                    {nextPoke && (
                        <button
                            onClick={() => navigate(`/pokemon/${nextPoke.id}`)}
                            className="flex flex-row gap-5 btn-custom">
                            <p>Next: {nextPoke.name}</p>
                            <ArrowRightFromLine />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PokemonDetail;
