import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import { Navigation } from "./dashboard/Navigation";
import { RightSidebar } from "./dashboard/RightSidebar";
import { Header as DashboardHeader } from "./dashboard/Header";

import { Header as WebsiteHeader } from "./website/Header";
import { Footer } from "./website/Footer";

export function RootLayout() {

    const [searchLabel, setSearchLabel] = useState("Crop");
    const [sidebarImage, setImage] = useState("/assets/Dashboard-Side.png");

    const location = useLocation();

    const isDashboardSection = location.pathname.startsWith("/dashboard");
    const isAuthRoute = location.pathname === "/register/donor" || location.pathname === "/register/charity" || location.pathname === "/login";
    const isDonationPage = location.pathname === "/donation";

    return (
        <>
            {/* Auth Routes - Show only the main content */}
            {isAuthRoute && (
                <main>
                    <Outlet />
                </main>
            )}

            {/* Dashboard Routes - Show dashboard layout */}
            {isDashboardSection && !isAuthRoute && (
                <div className="flex">
                    <Navigation setSearchLabel={setSearchLabel} setImage={setImage} />

                    <div className="flex-grow mx-64 ml-64 mr-72 bg-[#F1F7F7] p-10 min-h-[970px]">
                        <DashboardHeader searchLabel={searchLabel} />
                        <main>
                            <Outlet />
                        </main>
                    </div>

                    <RightSidebar sidebarImage={sidebarImage} />
                </div>
            )}

            {/* Website Routes - Show website layout */}
            {!isDashboardSection && !isAuthRoute && (
                <>
                    <WebsiteHeader color={isDonationPage ? "#01380B" : "#000000"} />
                    <main>
                        <Outlet />
                    </main>
                    <Footer />
                </>
            )}
        </>
    );
}