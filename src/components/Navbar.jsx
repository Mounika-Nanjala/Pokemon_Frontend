import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    const location = useLocation();

    useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "My Roster", path: "/my-roster" },
        { name: "Battle", path: "/battle" },
        { name: "Leaderboard", path: "/leaderboard" },
    ];

    return (
        <nav className="bg-pokemon-navbarLight dark:bg-pokemon-navbarDark text-black dark:text-white p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold">
                    Pokémon Battle
                </Link>

                {/* Navigation + Theme Toggle  */}
                <div className="flex items-center gap-6">
                    {/* Navigation Links */}
                    <ul className="hidden md:flex gap-6">
                        {navLinks.map(({ name, path }) => (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={`block p-2 border-b-2 transition-colors ${
                                        location.pathname === path
                                            ? "border-gray-400"
                                            : "border-transparent hover:border-gray-400"
                                    }`}>
                                    {name}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Dark Mode Toggle */}
                    <label className="swap swap-rotate cursor-pointer flex items-center">
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <Sun
                            className={`h-6 w-6 text-yellow-400 ${
                                darkMode ? "hidden" : "block"
                            }`}
                        />
                        <Moon
                            className={`h-6 w-6 text-gray-300 ${
                                darkMode ? "block" : "hidden"
                            }`}
                        />
                    </label>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-black dark:text-white text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                        aria-controls="nav-menu">
                        ☰
                    </button>
                </div>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <ul
                    id="nav-menu"
                    className="flex flex-col md:hidden bg-pokemon-navbarLight dark:bg-pokemon-navbarDark p-4 gap-4">
                    {navLinks.map(({ name, path }) => (
                        <li key={path}>
                            <Link
                                to={path}
                                className={`block p-2 border-b-2 transition-colors ${
                                    location.pathname === path
                                        ? "border-accent"
                                        : "border-transparent hover:border-gray-400"
                                }`}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
