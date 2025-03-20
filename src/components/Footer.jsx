const Footer = () => {
    return (
        <footer className="bg-pokemon-navbarLight dark:bg-pokemon-navbarDark text-black dark:text-white text-center p-8 border-t border-gray-300 dark:border-gray-700">
            <p>
                © {new Date().getFullYear()} Pokémon Battle Game. All rights
                reserved.
            </p>
        </footer>
    );
};

export default Footer;
