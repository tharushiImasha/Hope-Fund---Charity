import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export function Header({color}: {color?: string}) {

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>

            <nav
                className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
                    isScrolled ? "bg-white shadow-lg" : ""
                }`}
                style={!isScrolled && color ? { backgroundColor: `${color}80` } : undefined}
            >

            <div className="container mx-auto px-4 py-5 flex justify-between items-center">

                    <Link to="/" className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? "text-[#60E83E]" : "text-white"}`}>
                        <span className={`${isScrolled ? "text-[#00C424]" : "text-white"}`}>Hope</span>Fund<span className={`${isScrolled ? "text-[#00C424]" : "text-[#60E83E]"}`}>.</span>
                    </Link>

                    <div className={`hidden md:flex space-x-8 text-[14px] transition-colors duration-300 ${isScrolled ? "text-[#00C424]" : "text-white"}`}>
                        <Link to="/" className={`hover:text-green-400 ${location.pathname === "/" ? "font-bold" : ""}`}>Home</Link>
                        <Link to="/about" className={`hover:text-green-400 ${location.pathname === "/about" ? "font-bold" : ""}`}>About</Link>
                        <Link to="/charities" className={`hover:text-green-400 ${location.pathname === "/charities" ? "font-bold" : ""}`}>Charities</Link>
                        <Link to="/contact" className={`hover:text-green-400 ${location.pathname === "/contact" ? "font-bold" : ""}`}>Contact</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>

                    {/* Mobile Menu */}
                    {isOpen && (
                        <div className="absolute top-16 left-0 w-full bg-black bg-opacity-90 text-white p-5 flex flex-col space-y-4 text-center">
                            <Link to="/" className={`hover:text-green-400 ${location.pathname === "/" ? "font-bold" : ""}`} onClick={() => setIsOpen(false)}>Home</Link>
                            <Link to="/about" className={`hover:text-green-400 ${location.pathname === "/about" ? "font-bold" : ""}`} onClick={() => setIsOpen(false)}>About</Link>
                            <Link to="/charities" className={`hover:text-green-400 ${location.pathname === "/charities" ? "font-bold" : ""}`} onClick={() => setIsOpen(false)}>Charities</Link>
                            <Link to="/contact" className={`hover:text-green-400 ${location.pathname === "/contact" ? "font-bold" : ""}`} onClick={() => setIsOpen(false)}>Contact</Link>
                        </div>
                    )}

                    {/* Get Started Button */}
                    <Link to="/login" className="hidden md:block bg-[#00C424] text-white px-7 py-2 rounded-[26px] text-[12px] h-[35px] w-[130px] font-semibold border-white border-1" >
                        Get Started
                    </Link>
                </div>
            </nav>
        </>
    );
}