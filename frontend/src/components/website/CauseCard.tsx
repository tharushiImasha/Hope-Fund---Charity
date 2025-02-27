import {useNavigate} from "react-router-dom";
import {Causes} from "../../models/dashboard/Causes.ts";

export function CauseCard({ cause }: { cause: Causes }) {

    const progress = (cause.raisedAmount / cause.goalAmount) * 100;
    const navigate = useNavigate();

    const loadDetails = () => {
        navigate('/donation', {
            state: cause,
            documentation: cause.documentation
        });
    };

    return (
        <>
            <div className="bg-white pb-4 rounded-t-[30px] max-w-[380px]">
                <div className="relative">
                    <img
                        src={cause.image}
                        alt={cause.title}
                        className="rounded-t-[30px] mb-4 w-[380px] h-auto object-cover"
                    />
                    <span className="absolute bottom-3 left-3 bg-[#00C424] text-white text-sm font-semibold px-3 py-1 rounded-md">
                        {cause.category}
                    </span>
                </div>

                <h3 className="font-semibold text-[18px] px-4">{cause.title}</h3>
                <div className="mt-9 relative px-4">
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

                <p className="text-sm mt-6 text-gray-400 px-4">
                    <span className="mr-6">💸 GOAL: LKR {cause.goalAmount.toLocaleString()}</span>
                    <span>📊 Raised: LKR {cause.raisedAmount.toLocaleString()}</span>
                </p>
                <button className="mt-8 px-6 py-2 border border-2 border-[#E7E7E7] rounded-[26px] hover:bg-gray-200 text-[14px] mx-4" onClick={loadDetails}>
                    Learn More
                </button>
            </div>
        </>
    );
}