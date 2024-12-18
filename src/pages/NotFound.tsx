import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-lg mb-4">Kechirasiz, siz izlagan sahifa topilmadi.</p>
            <Link
                to="/"
                className="px-4 py-2 bg-[#0EB182] text-white rounded hover:bg-[#0EB182]/80 transition"
            >
                Bosh sahifaga qaytish
            </Link>
        </div>
    );
};

export default NotFound;
