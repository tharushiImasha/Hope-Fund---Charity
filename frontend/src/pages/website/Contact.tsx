import {TopBanner} from "../../components/website/TopBanner.tsx";
import {useState} from "react";

interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export function Contact() {

    const [formData, setFormData] = useState<ContactFormData>({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

    };

    return (
        <>
            <TopBanner
                title="Contact HopeFund"
                breadcrumb="Contact"
                image="/website/assets/ContactTop.png"
            />

            <div className="bg-[#FCFFFA] py-26 px-4 sm:px-6 lg:px-8">
                <div className="max-w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column - Contact Information */}
                    <div className="mr-16">
                        <h1 className="text-[32px] font-semibold text-gray-900">Contact Us</h1>
                        <p className="text-[#999999] text-[16px]">We're here to assist you anytime</p>

                        <div className="mt-8 space-y-6">
                            <p className="text-[#999999] text-[14px] mb-10">
                                Have questions or <span className="text-black">need assistance?</span>  We're here to help! Reach out to us for any inquiries about donations, charity partnerships, or general support. Our team is <span className="text-black">ready to assist you</span> with the best solutions.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <img src="/website/assets/icons/phone.png" alt="phone" className="w-[40px] h-auto" />
                                    <div>
                                        <p className="text-[12px] text-[#999999]">Contact Number</p>
                                        <p className="font-[15px] font-regular">(+94) 71 4742 066</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <img src="/website/assets/icons/email.png" alt="email" className="w-[40px] h-auto" />
                                    <div>
                                        <p className="text-[12px] text-[#999999]">Email</p>
                                        <p className="font-[15px] font-regular">info.hopefund@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <img src="/website/assets/icons/loaction.png" alt="location" className="w-[40px] h-auto" />
                                    <div>
                                        <p className="text-[12px] text-[#999999]">Location</p>
                                        <p className="font-[15px] font-regular">Bosewell place, Colombo 06, Srilanka</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t py-8 border-[#999999] flex gap-20">
                                <div>
                                    <h3 className="text-[14px] font-medium">Business Hours</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-[12px] text-[#999999]">Monday to Friday: 9 AM – 6 PM</p>
                                        <p className="text-[12px] text-[#999999]">Saturday: 10 AM – 2 PM</p>
                                        <p className="text-[12px] text-[#999999]">Sunday: Closed</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-medium">Support Policy</h3>
                                    <div className="mt-2 space-y-1">
                                        <p className="text-[12px] text-[#999999]">
                                           We aim to respond to all inquiries <br/> within 24 hours. For urgent <br/> matters, please call us directly
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="bg-white p-12 rounded-[5px] shadow-lg">
                        <h2 className="text-[25px] font-regular text-black">Get in touch</h2>
                        <p className="text-[#999999] text-[14px]">Drop us a message today!</p>

                        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-[13px] font-medium text-gray-700">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        className="mt-1 block w-full h-[35px] rounded-[5px] border border-black/10 focus:border-green-500 focus:ring-green-500 text-[12px] p-2"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="lastName" className="block text-[13px] font-medium text-gray-700">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        required
                                        className="mt-1 block w-full h-[35px] rounded-[5px] border border-black/10 focus:border-green-500 focus:ring-green-500 text-[12px] p-2"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-[13px] font-medium text-gray-700">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full h-[35px] rounded-[5px] border border-black/10 focus:border-green-500 focus:ring-green-500 text-[12px] p-2"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-[13px] font-medium text-gray-700">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    required
                                    className="mt-1 block w-full h-[35px] rounded-[5px] border border-black/10 focus:border-green-500 focus:ring-green-500 text-[12px] pl-2 pt-2"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 mt-14 px-4 border border-transparent rounded-[5px] shadow-sm text-sm font-medium text-white bg-[#00C424] hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}