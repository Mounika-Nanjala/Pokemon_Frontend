import { useState } from "react";
import { Link } from "react-router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    Pokémon Battle
                </Link>

                {/* Hamburger-Button für Mobile */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>

                {/* Navigation Links - Standard & Mobile */}
                <ul
                    className={`md:flex gap-4 absolute md:static left-0 w-full md:w-auto bg-gray-800 md:bg-transparent p-4 md:p-0 transition-all ${
                        isOpen ? "top-12" : "-top-96"
                    }`}>
                    <li>
                        <Link to="/" className="block p-2 hover:text-gray-400">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/my-roster"
                            className="block p-2 hover:text-gray-400">
                            My Roster
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/battle"
                            className="block p-2 hover:text-gray-400">
                            Battle
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/leaderboard"
                            className="block p-2 hover:text-gray-400">
                            Leaderboard
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
