import {Link} from "react-router";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function Navigation({ setSearchLabel, setImage }) {
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);
    const navigate = useNavigate();

    const handleLinkClick = (path, label, image) => {
        setActivePath(path);
        setSearchLabel(label);
        setImage(image);
    };

    function logout() {
        navigate('/');
    }

    return (
        <>
            <aside className="w-64 h-screen bg-white text-[#006307] fixed left-0 top-0 flex flex-col items-center">
                <div className="font-bold mt-[50px] mb-[80px]">
                    <img src="/dashboard/assets/Logo.png" alt="Logo"/>
                </div>
                <nav className="flex flex-col items-cemter w-full px-4">
                    <ul className="list-none w-full flex flex-col items-start px-10 space-y-4">
                        {[
                            { id: 'dashboard-btn', path: '/dashboard', icon: '/dashboard/assets/Dashboard.png', label: 'Dashboard', image: '/dashboard/assets/Dashboard-Side.png' },
                            { id: 'crop-btn', path: '/dashboard/charities', icon: '/dashboard/assets/charity.png', label: 'Charities', image: '/dashboard/assets/Charity-img.png' },
                            { id: 'staff-btn', path: '/dashboard/donors', icon: '/dashboard/assets/donation.png', label: 'Donors', image: '/dashboard/assets/Donor-img.png' },
                            { id: 'fields-btn', path: '/dashboard/causes', icon: '/dashboard/assets/causes.png', label: 'Causes', image: '/dashboard/assets/Cause-img.png' },
                            { id: 'vehicles-btn', path: '/dashboard/admin', icon: '/dashboard/assets/Admin.png', label: 'Admins', image: '/dashboard/assets/Admin-img.png' },
                            // { id: 'equipment-btn', path: '/equipment', icon: '/assets/Equipment.png', label: 'Equipment', image: '/assets/Equipment-img.png' },
                            // { id: 'logs-btn', path: '/logs', icon: '/assets/Logs.png', label: 'Logs', image: '/assets/Logs-img.png' },
                        ].map((item) => (
                            <li
                                key={item.id}
                                id={item.id}
                                className={`flex items-center gap-4 px-2 py-3 text-left cursor-pointer transition ${
                                    activePath === item.path
                                        ? "bg-[#DFF6D0] border-l-4 border-[#00C424] text-[#006307] w-full rounded-lg h-11"
                                        : "hover:text-[#162635]"
                                }`}
                                onClick={() => handleLinkClick(item.path, item.label, item.image)}
                            >
                                <Link to={item.path} className="flex items-center gap-4 w-full">
                                    <img src={item.icon} alt={item.label} className="w-5" />
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-[170px]">
                        <button
                            id="logout"
                            className="flex items-center gap-4 px-10 py-2 text-[#006307] hover:text-[#162635] transition" onClick={logout}
                        >
                            <img src="/dashboard/assets/Logout.png" alt="Logout" className="w-6 h-6"/>
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
                <div className="mt-6 p-4">
                    <img src="/dashboard/assets/Coner-img.png" alt="Corner" className="w-44"/>
                </div>
            </aside>
        </>
    )
}