import { FaHandsHelping } from "react-icons/fa";

export function HelpSection() {

    const features = [
        {
            title: "Give Donation",
            description: "Your generosity can change lives. Whether it’s providing food for the hungry, medical aid for the sick, or education for children, every contribution makes a real difference.",
            icon: "/website/assets/icons/donate-box.png",
            label: "Donation"
        },
        {
            title: "Fundraise for a Cause",
            description: "Create a fundraising campaign for a cause you care about. Rally your friends, family, and community to contribute and help those in urgent need receive support.",
            icon: "/website/assets/icons/fundraiser-box.png",
            label: "Fundraise for a cause"
        },
        {
            title: "Support Charities Directly",
            description: "Partner with charities by offering resources, supplies, or professional services. Whether it’s donating essentials, sponsoring events, or providing mentorship, your direct support strengthens their mission and impact.",
            icon: "/website/assets/icons/support-box.png",
            label: "Fundraise for a cause"
        },
        {
            title: "Spread Awareness",
            description: "Use your voice to raise awareness about important causes. Share stories, campaigns, and donation links on social media to inspire others and create a movement of change.",
            icon: "/website/assets/icons/awareness-box.png",
            label: "Fundraise for a cause"
        },
    ];

    return (
        <>
            <section className="bg-[#FAFFF8] py-20 px-20 ml-[20px]">
                <div className="text-center mb-10">
                    <p className="text-black/40 text-[22px]">Awesome Feature</p>
                    <h2 className="text-[40px] font-semibold">How Could You Help</h2>
                </div>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-30">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="border-1 border-[#00C424] p-6 rounded-[5px] shadow-sm flex items-start space-x-4 hover:shadow-md transition-shadow duration-300"
                        >
                            <img src={feature.icon} alt={feature.label} className="w-[31px]" />
                            <div>
                                <h3 className="text-[#00C424] font-semibold text-[21px]">{feature.title}</h3>
                                <p className="text-black/50 text-[13px] mt-[15px]">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}