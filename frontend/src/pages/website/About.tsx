import {TopBanner} from "../../components/website/TopBanner.tsx";
import {WhoAreWeSection} from "../../components/website/WhoAreWeSection.tsx";
import {ClientSay} from "../../components/website/ClientSay.tsx";
import {useState} from "react";

const teamMembers = [
    {
        name: "Tharushi Imasha",
        role: "Founder & CEO",
        image: "/website/assets/Ceo.png",
        description:
            "Tharushi is the visionary behind HopeFund, dedicated to bridging the gap between donors and charities. Her leadership drives innovation, transparency, and impactful giving.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Mark Simon",
        role: "Chief Technology Officer",
        image: "/website/assets/Chief.png",
        description:
            "Mark oversees HopeFund’s technology, ensuring a seamless, secure, and user-friendly experience. His expertise in web and data security keeps donations and causes safe.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Emily Foster",
        role: "Marketing Manager",
        image: "/website/assets/Manager.png",
        description:
            "Emily leads the marketing efforts at HopeFund, spreading awareness and connecting compassionate donors with meaningful causes through strategic campaigns.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
    {
        name: "Daniel Hayes",
        role: "Head of Development",
        image: "/website/assets/Dev.png",
        description:
            "Daniel is the backbone of HopeFund’s platform development, ensuring smooth functionality and continuous improvements to enhance the donor-charity experience.",
        social: [
            { platform: "facebook", link: "#" },
            { platform: "twitter", link: "#" },
            { platform: "linkedin", link: "#" },
        ],
    },
];

export function About() {
    return (
        <>
            <TopBanner
                title="About HopeFund"
                breadcrumb="About"
                image="/website/assets/AboutTop.png"
            />

            <div className="my-8"></div>

            <WhoAreWeSection/>

            <section className="py-16 pt-23 bg-white text-center">
                <h2 className="text-[32px] font-semibold text-gray-900">Visionaries Behind HopeFund</h2>
                <p className="text-[#999999] text-[16px]">
                    Meet the passionate minds driving HopeFund’s mission forward.
                </p>
                <div className="mt-14 flex flex-wrap justify-center gap-7">
                    {teamMembers.map((member, index) => (
                        <TeamCard key={index} member={member} />
                    ))}
                </div>
            </section>

            <ClientSay/>
        </>
    );
}

function TeamCard({ member }) {
    const [hover, setHover] = useState(false);
    return (
        <div
            className="relative w-74 h-auto rounded-lg overflow-hidden shadow-lg transition-all duration-300"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <img
                src={member.image}
                alt={member.name}
                className={`w-full h-full object-cover ${hover && member.description ? "opacity-30" : ""}`}
            />
            {!hover || !member.description ? (
                <div className="absolute bottom-4 left-4 text-left">
                    <h3 className="text-white text-lg font-semibold">{member.name}</h3>
                    <p className="text-gray-200 text-sm">{member.role}</p>
                </div>
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-4">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm">{member.role}</p>
                    <p className="text-xs mt-2 text-gray-300">{member.description}</p>
                    <div className="mt-3 flex gap-2">
                        {member.social.map((social, i) => (
                            <a key={i} href={social.link} className="text-white text-lg">
                                <i className={`fab fa-${social.platform}`}></i>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
