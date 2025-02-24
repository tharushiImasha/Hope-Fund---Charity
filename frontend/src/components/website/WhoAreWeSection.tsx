import { FaHandHoldingUsd } from "react-icons/fa";

export function WhoAreWeSection() {
    return (
        <>
            <section className="flex flex-col lg:flex-row items-center justify-between py-18 max-w-7xl mx-auto">
                <div className="relative">
                    <img
                        src="/website/assets/WhoAreWeBoy.png"
                        alt="Child in need"
                        className="w-[450px] h-auto object-cover rounded-[10px] border-4 border-white"
                    />
                    <img
                        src="/website/assets/WhoAreWeGirl.jpg"
                        alt="Smiling child"
                        className="w-[200px] h-[250px] object-cover rounded-[10px] absolute bottom-[-40px] right-[-60px] border-4 border-white"
                    />
                </div>

                <div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-12 text-center lg:text-left">
                    <h3 className="text-black/40 text-lg">Who Are We</h3>
                    <h2 className="text-[40px] leading-12 font-semibold mt-2">
                        Connecting <span className="text-black underline">Hearts</span>,<br />
                        Changing <span className="text-black underline">Lives</span>
                    </h2>
                    <p className="text-gray-600 mt-7 text-[15px]">
                        Our mission is to empower generosity by making donation seamless
                        and accessible. We envision a world where no cause goes unheard
                        and every small act of kindness creates a ripple of hope.
                    </p>

                    <div className="flex justify-center lg:justify-start items-center space-x-8 mt-7">
                        <div className="flex items-center space-x-2">
                            <FaHandHoldingUsd className="text-green-500 text-2xl" />
                            <div>
                                <p className="text-black/40 text-[13px]">Total Collection</p>
                                <p className="text-[20px] font-semibold">152000.00</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaHandHoldingUsd className="text-green-500 text-2xl" />
                            <div>
                                <p className="text-black/40 text-[13px]">Total Collection</p>
                                <p className="text-[20px] font-semibold">152000.00</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center lg:justify-start space-x-4">
                        <button className="bg-[#00C424] text-white px-6 py-2 rounded-full text-[14px] font-semibold hover:bg-green-600 transition w-[160px]">
                            Start Donation
                        </button>
                        <button className="border border-[#00C424] text-[#00C424] px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition text-[14px] w-[160px]">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}