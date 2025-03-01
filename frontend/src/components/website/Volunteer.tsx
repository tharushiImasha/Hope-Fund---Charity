import {useNavigate} from "react-router-dom";

export function Volunteer() {

    const navigate = useNavigate();

    const navigation = () => {
        navigate('/charities')
    };

    return (
        <>
            <div className="relative w-full h-[370px] flex items-center justify-center text-center">
                <img
                    src="/website/assets/Volunteer.png"
                    alt="Volunteer"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="relative z-10 px-4">
                    <h1 className="text-white text-[40px] font-semibold drop-shadow-xl text-shadow-10">
                        Forget what you can get and <br /> see what you can give
                    </h1>
                    <button className="mt-8 px-6 py-2 bg-[#00C424] text-white rounded-[26px] text-[14px] font-semibold hover:bg-green-600 transition" onClick={navigation}>
                        Become a Volunteer
                    </button>
                </div>
            </div>
        </>
    );
}