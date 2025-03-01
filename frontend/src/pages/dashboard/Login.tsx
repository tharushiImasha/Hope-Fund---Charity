import { useState } from "react";
import { Inputs } from "../../components/dashboard/Inputs.tsx";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData } from "../../reducers/FormSlice.ts";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase.ts";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const formData = useSelector((state) => state.formData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({ name, value }));
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/dashboard');
        } catch (error) {
            alert("Invalid email or password");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;

            localStorage.setItem("email", user.email);
            localStorage.setItem("name", user.displayName);
            localStorage.setItem("photo", user.photoURL);
            navigate('/dashboard');
        } catch (error) {
            alert("Error signing in with Google");
        }
    };

    function register() {
        setShowPopup(true);
    }

    function handleUserTypeSelection(userType: string) {
        setShowPopup(false);
        navigate(`/register/${userType}`);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="flex rounded-lg shadow-lg overflow-hidden bg-white w-[1280px] h-[832px]">

                <div className="flex-1 p-12">
                    <img
                        src="/dashboard/assets/Logo.png"
                        alt="Green Shadow Logo"
                        className="w-36 mb-[60px]"
                    />

                    <div className="py-4 px-[60px]">
                        <h1 className="text-[32px] font-semibold text-[#17502E]">Welcome back!</h1>
                        <p className="text-gray-600">Let's Make Magic Happen</p>

                        {/* Social Login */}
                        <div className="flex gap-4 my-8 mt-[45px]">
                            <button
                                className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2" onClick={handleGoogleLogin}>
                                <img src="/dashboard/assets/google.png" alt="Google" className="w-5" />
                                Login with Google
                            </button>
                            <button
                                className="flex items-center justify-center w-full py-2 border rounded-lg text-sm font-medium gap-2">
                                <img src="/dashboard/assets/apple.png" alt="Apple" className="w-5"/>
                                Login with Apple
                            </button>
                        </div>

                        <div className="flex items-center gap-2 my-6">
                            <div className="flex-grow h-px bg-gray-300"></div>
                            <h5 className="text-xs text-gray-500">or</h5>
                            <div className="flex-grow h-px bg-gray-300"></div>
                        </div>

                        <form className="flex flex-col ">
                            <Inputs
                                label="Email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                            />

                            <Inputs
                                label="Password"
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password || ''}
                                onChange={handleChange}
                            />
                            <a
                                href="#"
                                className="text-xs text-gray-500 hover:underline text-right"
                            >
                                Forgot Password?
                            </a>
                            <button
                                type="button"
                                className="mt-[50px] px-4 bg-[#17502E] text-white rounded-[10px] hover:bg-[#1A6D3B] w-full h-[40px] flex items-center justify-center text-[15px] float-right" onClick={handleLogin}>
                                Login
                            </button>
                        </form>

                        <p className="mt-6 text-xs text-gray-500 text-center">
                            Don't have an account?{" "}
                            <span className="text-[#17502E] hover:underline cursor-pointer" onClick={register}>
                                Register now.
                            </span>
                        </p>
                    </div>

                </div>

                {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-xl font-semibold mb-4">Register as:</h2>
                            <div className="flex gap-4">
                                <button
                                    className="px-4 py-2 bg-[#17502E] text-white rounded hover:bg-[#1A6D3B]"
                                    onClick={() => handleUserTypeSelection("donor")}
                                >
                                    Donor
                                </button>
                                <button
                                    className="px-4 py-2 bg-[#17502E] text-white rounded hover:bg-[#1A6D3B]"
                                    onClick={() => handleUserTypeSelection("charity")}
                                >
                                    Charity Representative
                                </button>
                            </div>
                            <button
                                className="mt-4 text-gray-500 text-sm hover:underline"
                                onClick={() => setShowPopup(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                <div className="hidden lg:flex flex-1 items-center justify-center bg-white p-[10px]">
                    <img
                        src="/dashboard/assets/Login.png"
                        alt="Scenic Image"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </div>

    );
}