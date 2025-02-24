import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export function Footer() {
    return (
        <footer className="bg-[#002408] text-white">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left py-10 px-20 pt-[80px] flex items-center justify-center">

                <div>
                    <h2 className="text-[24px] font-semibold">HopeFund <span className="text-[#60E83E]">.</span></h2>
                    <p className="mt-5 mb-4 text-[#A3A3A3] text-[15px]">
                        Please contact us if you have a specific <br/> problem or idea.
                    </p>
                    <a href="mailto:info.hopefund@gmail.com" className="text-blue-400 hover:underline text-[15px]">
                        info.hopefund@gmail.com
                    </a>
                </div>

                <div>
                    <h2 className="text-[24px] font-semibold">Pages</h2>
                    <div className="mt-5 text-[#A3A3A3] text-[15px] grid grid-cols-2 gap-2">
                        <a href="#" className="hover:text-white">Home</a>
                        <a href="#" className="hover:text-white">Agencies</a>
                        <a href="#" className="hover:text-white">About</a>
                        <a href="#" className="hover:text-white">Contact</a>
                        <a href="#" className="hover:text-white">Charities</a>
                    </div>
                </div>

                <div>
                    <h2 className="text-[24px] font-semibold">Social</h2>
                    <div className="flex justify-center md:justify-start space-x-4 mt-5">
                        <a href="#" className="text-white hover:text-gray-300">
                            <FaXTwitter size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-300">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-300">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" className="text-white hover:text-gray-300">
                            <FaFacebook size={20} />
                        </a>
                    </div>
                    <p className="mt-2 text-[#A3A3A3] text-[15px] mt-6">Follow us on above social medias to <br/> get in update</p>
                </div>
            </div>

            <div className="mt-6 p-4 text-white text-sm border-t border-[#04440F] bg-[#000B02] h-[50px] flex justify-between">
                <p className="ml-[250px]">&copy; 2025 HopeFund</p>
                <p className="mr-[250px]">Developed & designed by <span className="font-bold">Imasha</span></p>
            </div>
        </footer>
    );
}