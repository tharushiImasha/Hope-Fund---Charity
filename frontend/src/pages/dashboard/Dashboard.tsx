import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
    Pie,
    PieChart
} from 'recharts';

export function Dashboard() {
    type ChartData = {
        name: string;
        value: number;
    };

    const donationData: ChartData[] = [
        { name: 'Health', value: 400 },
        { name: 'Education', value: 300 },
        { name: 'Animal Welfare', value: 200 },
        { name: 'Cancer Support', value: 278 },
    ];

    const userActivityData = [
        { name: 'New Donors', amount: 150 },
        { name: 'Recurring Donors', amount: 85 },
        { name: 'Active Campaigns', amount: 50 },
        { name: 'Completed Campaigns', amount: 120 }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const [activeIndex, setActiveIndex] = useState(-1);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <>
            <main className="flex flex-col bg-gray-100 min-h-screen pt-[60px]">
                <div className="px-10 py-5">
                    <div className="mb-8">
                        <h5 className="text-gray-500 text-lg">Hello,</h5>
                        <h2 className="text-[32px] font-bold mb-[60px]">{localStorage.getItem("name")}</h2>
                    </div>
                    <section className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-md h-[400px]">
                            <h3 className="text-lg font-semibold text-center mt-[20px]">Donation Categories</h3>
                            <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={donationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#026664af" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                            <h3 className="text-lg font-semibold text-center mt-[20px] mb-[30px]">User Activity Overview</h3>
                            <PieChart width={250} height={250}>
                                <Pie
                                    activeIndex={activeIndex}
                                    data={userActivityData}
                                    dataKey="amount"
                                    outerRadius={120}
                                    fill="green"
                                    onMouseEnter={onPieEnter}
                                    style={{ cursor: 'pointer', outline: 'none' }}
                                >
                                    {userActivityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md h-[200px] text-center flex flex-col justify-center">
                            <h3 className="text-lg font-semibold mb-2">Pending Charities</h3>
                            <h2 className="text-3xl font-bold text-red-600">12</h2>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md h-[200px] text-center flex flex-col justify-center">
                            <h3 className="text-lg font-semibold mb-2">New Donors for This Week</h3>
                            <h2 className="text-3xl font-bold text-green-600">24</h2>
                        </div>

                    </section>
                </div>
            </main>
        </>
    );
}