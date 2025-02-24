import {CauseCard} from "./CauseCard.tsx";

interface Cause {
    id: number;
    title: string;
    image: string;
    goal: number;
    raised: number;
    category: string;
    description: string;
    location: string;
}

const causes: Cause[] = [
    {
        id: 1,
        title: "Food give way for public hospital in Colombo 07",
        image: "/website/assets/Causes1.png",
        goal: 150000,
        raised: 100000,
        category: "Emergency",
        description: "Helping patients at Colombo 07 hospital with food donations.",
        location: "Colombo 07"
    },
    {
        id: 2,
        title: "Food give way for public hospital in Colombo 07",
        image: "/website/assets/Causes2.png",
        goal: 120000,
        raised: 110000,
        category: "Cancer",
        description: "Providing nutritious meals for cancer patients in need.",
        location: "Colombo General Hospital"
    },
    {
        id: 3,
        title: "Food give way for public hospital in Colombo 07",
        image: "/website/assets/Causes1.png",
        goal: 90000,
        raised: 80000,
        category: "Cancer",
        description: "Supporting cancer patients with their medical bills.",
        location: "Maharagama Cancer Hospital"
    },
];

export function Causes() {
    return (
        <>
            <div className="container mx-auto p-28 pt-35">
                <div className="text-center">
                    <h3 className="text-black/40 text-[18px]">Donation Shows Passion</h3>
                    <h2 className="text-[36px] font-semibold mb-10">Featured Causes</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {causes.map((cause) => (
                        <CauseCard key={cause.id} cause={cause} />
                    ))}
                </div>
            </div>
        </>
    );
}