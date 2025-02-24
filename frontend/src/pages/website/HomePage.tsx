import {HelpSection} from "../../components/website/HelpSection.tsx";
import {WhoAreWeSection} from "../../components/website/WhoAreWeSection.tsx";
import {Causes} from "../../components/website/Causes.tsx";
import {Volunteer} from "../../components/website/Volunteer.tsx";
import {ClientSay} from "../../components/website/ClientSay.tsx";

export function HomePage() {
    return (
        <>
            <div className="relative w-full h-screen flex items-center bg-cover  bg-[url(/website/assets/Home-Image.png)] clip-bottom-shape">

                <div className="absolute right-0 text-white mr-[150px] max-w-3xl">
                    <h1 className="text-[80px] font-extrabold leading-23">
                        <span className="text-[#60E83E] underline">Bless</span> others with <br /> <span className="text-[100px]"> your </span> <span className="text-[#60E83E] text-[110px] underline">Gift</span>
                    </h1>
                    <p className="mt-10 text-[20px] text-[#DDE3DA] leading-7">
                        Connecting generous hearts with meaningful causes. Support verified charities, track your impact, and bring hope to those in need. Every <br/>donation makes a difference. Give hope today!
                    </p>
                    <button className="mt-[45px] px-6 py-3 bg-[#00C424] text-white rounded-[26px] border-white border-1 text-lg font-semibold shadow-md hover:bg-green-600 transition cursor-pointer">
                        Start Donation
                    </button>
                </div>
            </div>

            <section>
                <HelpSection/>
                <WhoAreWeSection/>
                <Causes/>
                <Volunteer/>
                <ClientSay/>
            </section>
        </>
    );
}