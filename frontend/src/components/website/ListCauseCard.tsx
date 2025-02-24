import {useNavigate} from "react-router-dom";

interface ListCauseCardProps {
    cause: {
        image: string;
        title: string;
        category: string;
        goal: number;
        raised: number;
        description: string;
        location: string;
    };
}

export function ListCauseCard({ cause }: ListCauseCardProps) {

    const navigate = useNavigate();

    const loadDetails = () => {
        navigate('/donation', {
            state: cause,
        });
    };

    const progress = (cause.raised / cause.goal) * 100;

    return (
        <>
            <div className="flex bg-white rounded-[20px] shadow-lg overflow-hidden pr-8">
                <img src={cause.image} alt={cause.title} className="w-1/3 h-[300px] object-cover rounded-l-[20px]" />

                <div className="flex-1 px-7 flex flex-col justify-center">
                    <p className="text-[#00C424] font-regular text-[16px]">{cause.category}</p>
                    <h3 className="text-[23px] font-semibold mb-2 mt-3">{cause.title}</h3>

                    {/* Progress Bar */}
                    <div className="mt-8 mb-10 relative">
                        <div className="relative w-full h-2 bg-gray-300 rounded-full">
                            <div
                                className="absolute h-2 bg-[#00C424] rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div
                            className="absolute top-[-24px] text-[14px] font-semibold text-black"
                            style={{ left: `${progress}%`, transform: 'translateX(-50%)' }}
                        >
                            {Math.round(progress)}%
                        </div>
                    </div>

                    {/* Goal & Raised */}
                    <div className="flex justify-between text-gray-600 text-sm mt-2">
                        <p>🎯 GOAL: ${cause.goal.toLocaleString()}</p>
                        <p>📈 Raised: ${cause.raised.toLocaleString()}</p>
                    </div>
                </div>

                {/* Learn More Button */}
                <div className="flex items-center">
                    <button className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100" onClick={loadDetails}>
                        Learn More
                    </button>
                </div>
            </div>
        </>
    );
}