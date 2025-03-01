import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

interface RightSidebarProps {
    sidebarImage: string;
}

export function RightSidebar({ sidebarImage }: RightSidebarProps) {
    const [currentTime, setCurrentTime] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const formatTime = (): string => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        setCurrentTime(formatTime());

        const timer = setInterval(() => {
            setCurrentTime(formatTime());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <aside className="w-72 h-screen bg-[#17502E] fixed right-0 top-0 flex flex-col items-center">
                <div
                    className="h-[600px] w-full bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${sidebarImage})` }}
                >
                    <div className="absolute top-4 left-0 w-full flex justify-center">
                        <span className="text-white text-6xl font-bold">
                            {currentTime}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center mt-4 mx-3">
                    <h4 className="text-white text-lg font-medium mb-2">Hope Fund</h4>
                    <h5 className="text-gray-400 text-sm font-medium mb-1">
                        Helps People Life and Their Formation
                    </h5>
                    <h5 className="text-gray-400 text-sm font-medium mb-5">
                        a reader will be distracted
                    </h5>
                    <p className="text-white text-sm">Over 3.5 billion people worldwide rely on charitable aid each year.</p>
                    <div className="w-64 h-[1px] bg-white my-2"></div>

                    <p className="text-white text-sm">More than 70% of donors prefer donating to causes with transparent impact reports</p>
                    <div className="w-64 h-[1px] bg-white my-2"></div>

                    <button className="mt-[35px] px-6 py-2 bg-transparent text-white rounded-[26px] border-white border-1 text-md font-semibold shadow-md hover:bg-green-600 transition cursor-pointer" onClick={() => navigate("/")}>
                        Go to Dashboard
                    </button>
                </div>
            </aside>
        </>
    );
}