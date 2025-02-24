import { TopBanner } from "../../components/website/TopBanner.tsx";
import { useState, useMemo } from "react";
import { FaBars, FaThLarge } from "react-icons/fa";
import { CauseCard } from "../../components/website/CauseCard.tsx";
import { ListCauseCard } from "../../components/website/ListCauseCard.tsx";

// Define our category options
const categories = [
    { name: "All", icon: "/website/assets/icons/allCharity.png" },
    { name: "Health Care", icon: "/website/assets/icons/healthcare.png" },
    { name: "Animal Welfare", icon: "/website/assets/icons/animal-welfare.png" },
    { name: "Education", icon: "/website/assets/icons/education.png" },
    { name: "Cancer", icon: "/website/assets/icons/cancer.png" },
    { name: "Emergency", icon: "/website/assets/icons/emergency.png" },
];

// Define our charity type
type Charity = {
    id: number;
    image: string;
    title: string;
    category: string;
    goal: number;
    raised: number;
    description: string;
    location: string;
};

// Our base charity data - this should be your complete list
const charities: Charity[] = [
    { id: 1, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 120000, raised: 100000, description: "Helping patients at Colombo 07 hospital with food donations.", location: "Colombo 07"},
    { id: 2, image: "/website/assets/Causes2.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 125000, raised: 80000, description: "Providing nutritious meals for cancer patients in need.", location: "Colombo General Hospital"},
    { id: 3, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Cancer", goal: 90000, raised: 70000, description: "Supporting cancer patients with their medical bills.", location: "Maharagama Cancer Hospital"},
    { id: 4, image: "/website/assets/Causes2.png", title: "Support children's education", category: "Education", goal: 150000, raised: 100000, description: "Helping children at Galle with book donation", location: "Galle"},
    { id: 5, image: "/website/assets/Causes1.png", title: "Clean water for rural areas", category: "Animal Welfare", goal: 100000, raised: 60000, description: "Providing meals for street dogs", location: "Hambanthota"},
    { id: 6, image: "/website/assets/Causes2.png", title: "Shelter for the homeless", category: "Emergency", goal: 200000, raised: 180000, description: "Supporting make homes to poor people", location: "Mathara"},

    { id: 1, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 120000, raised: 100000, description: "Helping patients at Colombo 07 hospital with food donations.", location: "Colombo 07"},
    { id: 2, image: "/website/assets/Causes2.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 125000, raised: 80000, description: "Providing nutritious meals for cancer patients in need.", location: "Colombo General Hospital"},
    { id: 3, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Cancer", goal: 90000, raised: 70000, description: "Supporting cancer patients with their medical bills.", location: "Maharagama Cancer Hospital"},
    { id: 4, image: "/website/assets/Causes2.png", title: "Support children's education", category: "Education", goal: 150000, raised: 100000, description: "Helping children at Galle with book donation", location: "Galle"},
    { id: 5, image: "/website/assets/Causes1.png", title: "Clean water for rural areas", category: "Animal Welfare", goal: 100000, raised: 60000, description: "Providing meals for street dogs", location: "Hambanthota"},
    { id: 6, image: "/website/assets/Causes2.png", title: "Shelter for the homeless", category: "Emergency", goal: 200000, raised: 180000, description: "Supporting make homes to poor people", location: "Mathara"},

    { id: 1, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 120000, raised: 100000, description: "Helping patients at Colombo 07 hospital with food donations.", location: "Colombo 07"},
    { id: 2, image: "/website/assets/Causes2.png", title: "Food give way for public hospital in Colombo 07", category: "Health Care", goal: 125000, raised: 80000, description: "Providing nutritious meals for cancer patients in need.", location: "Colombo General Hospital"},
    { id: 3, image: "/website/assets/Causes1.png", title: "Food give way for public hospital in Colombo 07", category: "Cancer", goal: 90000, raised: 70000, description: "Supporting cancer patients with their medical bills.", location: "Maharagama Cancer Hospital"},
    { id: 4, image: "/website/assets/Causes2.png", title: "Support children's education", category: "Education", goal: 150000, raised: 100000, description: "Helping children at Galle with book donation", location: "Galle"},

];

export function Charities() {
    // State management
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const charitiesPerPage = 6;

    const filteredCharities = useMemo(() => {
        if (isLoading) {
            return [];
        }

        if (selectedCategory === "All") {
            return charities;
        }
        return charities.filter(charity => charity.category === selectedCategory);
    }, [selectedCategory, isLoading]);

    const handleCategoryChange = (category: string) => {
        setIsLoading(true);

        setTimeout(() => {
            setSelectedCategory(category);
            setCurrentPage(1);
            setIsLoading(false);  // End loading state
        }, 100);  // Very short delay for visual transition
    };

    const totalPages = Math.ceil(filteredCharities.length / charitiesPerPage);
    const currentCharities = filteredCharities.slice(
        (currentPage - 1) * charitiesPerPage,
        currentPage * charitiesPerPage
    );

    return (
        <>
            <TopBanner title="Charity Programs" breadcrumb="Charity" image="/website/assets/CharityTop.png" />

            {/* Category Selection */}
            <div className="flex flex-col items-center py-10">
                <h2 className="text-[25px] font-semibold mb-6 mt-9">
                    Find Causes You Care About
                </h2>
                <div className="flex gap-5 flex-wrap justify-center">
                    {categories.map((category) => (
                        <button
                            key={category.name}
                            onClick={() => handleCategoryChange(category.name)}
                            className={`flex flex-col items-center justify-center px-6 py-4 w-[190px] border border-[#00C424] rounded-lg transition-all duration-300 text-[#00C424] text-sm font-semibold
                                ${selectedCategory === category.name ? "bg-[#D6FFCC] text-green-700" : "hover:bg-green-100"}`}
                        >
                            {category.icon && (
                                <img src={category.icon} alt={category.name} className="w-[30px] mb-2" />
                            )}
                            <span>{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6 mb-10 ">
                {/* View Toggle */}
                <div className="flex justify-between items-center mb-12 mt-6">
                    <h2 className="text-xl font-semibold text-[#00C424]">
                        Charity Causes
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setView("grid")}
                            className={`p-2 rounded ${view === "grid" ? "bg-gray-200 text-[#00C424]" : "bg-white text-[#00C424]"}`}
                        >
                            <FaThLarge size={20} />
                        </button>
                        <button
                            onClick={() => setView("list")}
                            className={`p-2 rounded ${view === "list" ? "bg-gray-200 text-[#00C424]" : "bg-white text-[#00C424]"}`}
                        >
                            <FaBars size={20} />
                        </button>
                    </div>
                </div>

                {/* Charities Display */}
                <div className={view === "grid" ? "grid grid-cols-3 gap-10" : "space-y-8"}>
                    {currentCharities.length > 0 ? (
                        currentCharities.map((cause) => (
                            view === "grid" ? (
                                <CauseCard key={`${cause.id}-${cause.category}`} cause={cause} />
                            ) : (
                                <ListCauseCard key={`${cause.id}-${cause.category}`} cause={cause} />
                            )
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">
                            No charities found for this category.
                        </p>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10 ">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`mx-1 px-4 py-2 border rounded ${
                                    currentPage === index + 1 ? "bg-[#00C424] text-white" : "bg-white text-[#00C424]"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}