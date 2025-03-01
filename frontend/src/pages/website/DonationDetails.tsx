import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Causes } from "../../models/dashboard/Causes.ts";
import { useDispatch, useSelector } from "react-redux";
import { Donation } from "../../models/dashboard/Donation.ts";
import {addDonation} from "../../reducers/DonationSlice.ts"; // Import your Donation class

export function DonationDetails() {
    const locationUse = useLocation();
    const cause = locationUse.state as Causes;
    const dispatch = useDispatch();
    const donation = useSelector((state) => state.donation);

    const [anonymous, setAnonymous] = useState(false);
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    const [supportMessage, setSupportMessage] = useState("");
    const [errors, setErrors] = useState<{ amount?: string; paymentMethod?: string }>({});

    if (!cause) {
        return <div className="text-center text-red-500">No cause details found.</div>;
    }

    if (!cause.goalAmount || !cause.raisedAmount) {
        cause.goalAmount = 0;
        cause.raisedAmount = 0;
    }

    const progress = Math.round((cause.raisedAmount / cause.goalAmount) * 100);

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount("");
        setErrors({ ...errors, amount: undefined });
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (/^\d*$/.test(value)) {
            setCustomAmount(value);
            setSelectedAmount(null);
            setErrors({ ...errors, amount: undefined });
        }
    };

    const handlePaymentMethodSelect = (method: string) => {
        setSelectedPaymentMethod(method);
        setErrors({ ...errors, paymentMethod: undefined });
    };

    const getCurrentDate = () => {
        const date = new Date();
        return date.toISOString().split('T')[0];
    };

    const generateDonationId = () => {
        return `DON-${Date.now()}`;
    };

    const handleDonateNow = () => {

        const newErrors: { amount?: string; paymentMethod?: string } = {};

        const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : 0);
        if (!finalAmount || finalAmount <= 0) {
            newErrors.amount = "Please select or enter a valid donation amount";
        }

        if (!selectedPaymentMethod) {
            newErrors.paymentMethod = "Please select a payment method";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newDonation = new Donation(
            generateDonationId(),
            anonymous ? "" : "Anonymous",
            cause.causeId || "",
            finalAmount,
            getCurrentDate(),
            selectedPaymentMethod || "",
            supportMessage || ""
        );

        console.log("Donation submitted:", newDonation);

        dispatch(addDonation(newDonation));


        alert("Thank you for your donation!");


    };

    function loadDocs() {
        console.log("Documentation:", cause.documentation);

        if (!cause.documentation) {
            alert("No documentation available.");
            return;
        }

        let base64String = cause.documentation;

        if (!base64String.startsWith("data:application/pdf;base64,")) {
            base64String = "data:application/pdf;base64," + base64String;
        }

        const byteCharacters = atob(base64String.split(",")[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    return (
        <div className="bg-white p-6 rounded-lg max-w-[1400px] mx-auto mt-[150px]">
            <div className="flex flex-col lg:flex-row items-start gap-10">
                <div className="w-full lg:w-1/3">
                    <img src={cause.image} alt={cause.title} className="rounded-lg w-full object-cover" />

                    <div className="mt-12 relative px-4">
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
                        <span className="mr-10">💸 GOAL: LKR {cause.goalAmount.toLocaleString()}</span>
                        <span>📊 Raised: LKR {cause.raisedAmount.toLocaleString()}</span>
                    </p>
                </div>
                <div className="w-full lg:w-2/3">
                    <h2 className="text-[32px] font-semibold">{cause.title}</h2>
                    <div className="flex items-center text-gray-600 mt-6 justify-between">
                        <div className="flex items-center gap-2" >
                            <span className="text-green-600"> <img src="/website/assets/icons/charityLocation.png" alt="location" className="w-[25px]"/> </span>
                            <p className="text-[#999999] text-[16px]">{cause.location}</p>
                        </div>
                        <span className="bg-[#60E83E] text-white text-[14px] px-3 py-2 rounded-[5px]">{cause.category}</span>
                    </div>
                    <p className="mt-4 text-gray-700 font-medium">{cause.description}</p>

                    <div className="w-full h-[1px] bg-[#999999] mt-5"></div>

                    <div className="mt-11">
                        <h3 className="font-regular text-[18px]">Select Donation Amount<span className="text-red-500">*</span></h3>
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {[100, 500, 1000, 5000].map((amount) => (
                                <button
                                    key={amount}
                                    className={`border rounded-[5px] py-2 px-4 hover:bg-gray-100 transition
                                        ${selectedAmount === amount
                                        ? 'border-green-500 bg-green-50 text-green-600'
                                        : 'border-black/35 text-gray-400'}`}
                                    onClick={() => handleAmountSelect(amount)}
                                >
                                    LKR {amount.toFixed(2)}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-7">
                            <button
                                className={`border rounded-[5px] py-2 px-10 hover:bg-gray-100 transition
                                    ${customAmount !== ''
                                    ? 'border-green-500 bg-green-50 text-green-600'
                                    : 'border-black/35 text-gray-400'}`}
                                onClick={() => document.getElementById('customAmountInput')?.focus()}
                            >
                                Custom Amount
                            </button>
                            <div className="flex items-center">
                                <span className="text-gray-600 text-[16px] mr-2">Amount (LKR):</span>
                                <input
                                    id="customAmountInput"
                                    type="text"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    placeholder="Custom Amount"
                                    className={`border rounded-[5px] p-2 px-3 w-full
                                        ${errors.amount ? 'border-red-500 bg-red-50' : 'border-black/35'}`}
                                />
                            </div>
                        </div>
                        {errors.amount && (
                            <p className="text-red-500 text-sm mt-2">{errors.amount}</p>
                        )}
                    </div>

                    <div className="mt-11">
                        <h3 className="font-regular text-[18px]">Select Payment Method<span className="text-red-500">*</span></h3>
                        <div className="grid grid-cols-4 gap-4 mt-6">
                            {["Card", "Bank Deposit"].map((method) => (
                                <button
                                    key={method}
                                    className={`border rounded-[5px] py-2 px-4 hover:bg-gray-100 transition
                                        ${selectedPaymentMethod === method
                                        ? 'border-green-500 bg-green-50 text-green-600'
                                        : 'border-black/35 text-gray-400'}`}
                                    onClick={() => handlePaymentMethodSelect(method)}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                        {errors.paymentMethod && (
                            <p className="text-red-500 text-sm mt-2">{errors.paymentMethod}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center space-y-6 mt-[60px]">
                <div className="w-full">
                    <label className="text-lg font-semibold">
                        Word of Support <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                        type="text"
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                        placeholder="Write your support message..."
                    />
                </div>

                <div className="flex items-center justify-between w-full mt-5">
                    <button className="border border-green-500 text-black font-semibold py-2 px-4 rounded-md hover:bg-green-50" onClick={loadDocs}>
                        View Documentation
                    </button>

                    <div className="flex items-center space-x-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={anonymous}
                                onChange={() => setAnonymous(!anonymous)}
                                className="sr-only peer"
                            />
                            <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 relative transition">
                                <div
                                    className={`w-4 h-4 bg-white rounded-full shadow-md absolute left-1 top-0.5 transform transition ${
                                        anonymous ? "translate-x-5" : ""
                                    }`}
                                ></div>
                            </div>
                        </label>
                        <span className="text-black font-medium">Donate Anonymously</span>
                    </div>
                </div>

                <div className="bg-green-50 text-red-600 p-3 rounded-md w-full mt-7">
                    <strong>Disclaimer:</strong>
                    <p className="text-sm">
                        • Donations made by the above means are final and will not be refunded.
                    </p>
                </div>

                <div className="w-full flex justify-end mt-8 mb-8">
                    <button
                        className="bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
                        onClick={handleDonateNow}
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
}