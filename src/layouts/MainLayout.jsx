import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="flex flex-col min-h-screen bg-pokemon-lightBg text-pokemon-textLight dark:bg-pokemon-darkBg dark:text-pokemon-textDark transition-colors duration-300">
            <header className="sticky top-0 z-50 bg-pokemon-navbarLight dark:bg-pokemon-navbarDark shadow">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            </header>
            <main className="flex-grow p-6">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;
