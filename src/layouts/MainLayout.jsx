import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
