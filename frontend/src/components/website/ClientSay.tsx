export function ClientSay() {

    const testimonials = [
        {
            name: "James Mitchell",
            role: "A Satisfied Donor",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            feedback:
                "I was looking for a way to make a real impact, and HopeFund made it easy. The platform is transparent, and I could choose a cause that truly mattered to me. Highly recommend!",
        },
        {
            name: "Sophia Reynolds",
            role: "Regular Contributor",
            image: "https://randomuser.me/api/portraits/women/1.jpg",
            feedback:
                "The donation process is seamless, and I love how I can track my contributions. Seeing the progress of causes I support makes me feel like I’m truly making a difference.",
        },
        {
            name: "Daniel Carter",
            role: "Community Supporter",
            image: "https://randomuser.me/api/portraits/men/4.jpg",
            feedback:
                "I donated to an emergency relief campaign, and within days, I saw updates on how my contribution was used. It’s inspiring to be part of a community that cares!",
        },
    ];

    return (
        <>
            <section className="bg-[#FAFFF8] py-26 px-8">
                <div className="max-w-7xl mx-auto flex mt-8">
                    <div className="min-w-[275px] mr-[45px]">
                        <h2 className="text-[32px] font-regular text-gray-900">Our Clients Say</h2>
                        <p className="text-[#999999] text-[16px] mt-2">
                            Hear from our donors and charities about their experiences with HopeFund.<br />
                            Real stories of impact and generosity.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#00C424] rounded-lg p-6 shadow-sm flex flex-col justify-between h-full"
                            >
                                <p className="text-gray-700 italic text-[14px] text-center">"{testimonial.feedback}"</p>
                                <div className="flex items-center mt-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div>
                                        <h4 className="text-black text-[14px] font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-[10px]">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}