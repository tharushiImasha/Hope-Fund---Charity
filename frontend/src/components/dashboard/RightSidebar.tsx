import { useState, useEffect } from 'react';

interface RightSidebarProps {
    sidebarImage: string;
}

export function RightSidebar({ sidebarImage }: RightSidebarProps) {
    // State to store the current time
    const [currentTime, setCurrentTime] = useState<string>('');

    // Effect to update the time every minute
    useEffect(() => {
        // Function to format the time as HH:mm
        const formatTime = (): string => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };

        // Set initial time
        setCurrentTime(formatTime());

        // Update time every minute
        const timer = setInterval(() => {
            setCurrentTime(formatTime());
        }, 60000); // Update every minute (60000 milliseconds)

        // Cleanup interval on component unmount
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <aside className="w-72 h-screen bg-[#17502E] fixed right-0 top-0 flex flex-col items-center">
                <div
                    className="h-[600px] w-full bg-cover bg-center relative" // Added relative positioning
                    style={{ backgroundImage: `url(${sidebarImage})` }}
                >
                    {/* Time display overlay */}
                    <div className="absolute top-4 left-0 w-full flex justify-center">
                        <span className="text-white text-6xl font-bold">
                            {currentTime}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center text-center mt-4">
                    <h4 className="text-white text-lg font-medium mb-2">Recent Logs</h4>
                    <h5 className="text-gray-400 text-sm font-medium mb-1">
                        It is a long established fact that
                    </h5>
                    <h5 className="text-gray-400 text-sm font-medium mb-5">
                        a reader will be distracted
                    </h5>
                    {[
                        'Cause inspection completed. (Date: 2024-12-05)',
                        'Charities analysis started. (Date: 2024-12-06)',
                    ].map((log, index) => (
                        <div key={index} className="mb-3 px-5">
                            <p className="text-white text-sm">{log}</p>
                            <div className="w-64 h-[1px] bg-white my-2"></div>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}