import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateFormData } from "../../reducers/FormSlice.ts";
import { Inputs } from "../../components/dashboard/Inputs.tsx";
import { addUser } from "../../reducers/UserSlice.ts";
import { AppDispatch } from "../../store/Store.ts";
import { addDonor } from "../../reducers/DonorSlice.ts";
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase.ts";
import { doc, setDoc } from "firebase/firestore"; // For Firestore

export function RegisterDonor() {
    const [showPassword, setShowPassword] = useState(false);
    const formData = useSelector((state) => state.formData);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    const handleRegister = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: formData.name,
            });

            const userData = {
                uid: user.uid,
                name: formData.name || "",
                email: formData.email || "",
                phone: formData.phone || "",
                role: "Donor",
                createdAt: new Date().toISOString(),
            };

            dispatch(addUser(userData));
            dispatch(addDonor(userData));

            localStorage.setItem("email", userData.email);
            localStorage.setItem("name", userData.name);
            localStorage.setItem("role", userData.role);

            navigate("/");
        } catch (error) {
            console.error("Error creating account:", error);
            alert("Error creating account. Check the console for details.");
        }
    };

    const handleGoogleRegister = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            const userData = {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                role: "Donor",
                createdAt: new Date().toISOString(),
            };
            await setDoc(doc(db, "users", user.uid), userData);

            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.displayName);

            navigate("/dashboard");
            // navigate("/additional-info", { state: { uid: user.uid } });
        } catch (error) {
            console.error("Error signing in with Google:", error);
            alert("Error signing in with Google");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="flex rounded-lg shadow-lg overflow-hidden bg-white w-[1280px] h-[832px]">
                    <div className="flex-1 p-12">
                        <img
                            src="/dashboard/assets/Logo.png"
                            alt="Green Shadow Logo"
                            className="w-36 mb-[30px]"
                        />

                        <div className="py-4 px-[10px]">
                            <h1 className="text-[32px] font-semibold text-gray-800">
                                Create an Account
                            </h1>
                            <p className="text-gray-600">Let's Make Magic Happen</p>

                            {/* Social Login */}
                            <div className="flex gap-4 my-8 mt-[45px]">
                                <button
                                    className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2"
                                    onClick={handleGoogleRegister}
                                >
                                    <img
                                        src="/dashboard/assets/google.png"
                                        alt="Google"
                                        className="w-5"
                                    />
                                    Login with Google
                                </button>
                                <button className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2">
                                    <img
                                        src="/dashboard/assets/apple.png"
                                        alt="Apple"
                                        className="w-5"
                                    />
                                    Login with Apple
                                </button>
                            </div>

                            <div className="flex items-center gap-2 my-6">
                                <div className="flex-grow h-px bg-gray-300"></div>
                                <h5 className="text-xs text-gray-500">or</h5>
                                <div className="flex-grow h-px bg-gray-300"></div>
                            </div>

                            <form className="flex flex-col">
                                <Inputs
                                    label="Full Name"
                                    placeholder="Enter your full name"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                />

                                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                                    <Inputs
                                        label="Email"
                                        placeholder="Enter your email"
                                        type="email"
                                        name="email"
                                        value={formData.email || ""}
                                        onChange={handleChange}
                                    />

                                    <Inputs
                                        label="Contact Number"
                                        placeholder="Enter your contact"
                                        type="number"
                                        name="phone"
                                        value={formData.phone || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                                    <Inputs
                                        label="Password"
                                        placeholder="Enter your password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password || ""}
                                        onChange={handleChange}
                                    />
                                    <Inputs
                                        label=" Confirm Password"
                                        placeholder="Confirm your password"
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword || ""}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="mt-[50px] px-4 bg-[#17502E] text-white rounded-[10px] hover:bg-[#1A6D3B] w-full h-[40px] flex items-center justify-center text-[15px] float-right"
                                    onClick={handleRegister}
                                >
                                    Create Account
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-gray-500 text-center">
                                Have an account?{" "}
                                <span
                                    className="text-[#17502E] hover:underline cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                  Login now.
                </span>
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-1 items-center justify-center bg-white p-[10px]">
                        <img
                            src="/dashboard/assets/Registration.png"
                            alt="Scenic Image"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}