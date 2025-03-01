import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.ts";

export function AdditionalInfoForm() {
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await setDoc(doc(db, "users", uid), {
                phone,
                address,
            }, { merge: true });

            navigate("/dashboard");
        } catch (error) {
            console.error("Error updating user data:", error);
            alert("Error updating user data. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#17502E] text-white py-2 px-4 rounded-md hover:bg-[#1A6D3B]"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}