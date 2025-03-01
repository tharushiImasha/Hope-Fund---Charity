import {useDispatch, useSelector} from "react-redux";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {Inputs} from "../../components/dashboard/Inputs.tsx";
import {AddButton} from "../../components/dashboard/AddButton.tsx";
import {useEffect, useState} from "react";
import {addAdmin, deleteAdmin, getAdmin, updateAdmin} from "../../reducers/AdminSlice.ts";
import {Admins} from "../../models/dashboard/Admins.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import {getUser} from "../../reducers/UserSlice.ts";
import {User} from "../../models/dashboard/User.ts";

export function Admin() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const admins = useSelector((state) => state.admin );
    const user = useSelector((state) => state.user );

    const [adminDetails, setAdminDetails] = useState([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<string | null>(null);

    useEffect(() => {
        if(admins.length === 0){
            dispatch(getAdmin());
            dispatch(getUser());
        }
    }, [dispatch, admins.length, user.length]);

    useEffect(() => {
        if (admins.length > 0 && user.length > 0) {
            const newAdminDetails = [];

            for (let i = 0; i < admins.length; i++) {
                let email = "";

                for (let j = 0; j < user.length; j++) {
                    if (admins[i].userId === user[j].userId) {
                        email = user[j].email;
                        break;
                    }
                }

                newAdminDetails.push({
                    email: email,
                    name: admins[i].name,
                    address: admins[i].address,
                    phone: admins[i].phone,
                });
            }

            setAdminDetails(newAdminDetails);

            console.log(newAdminDetails);
        }
    }, [admins, user]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editEmail) {
            const adminToUpdate = adminDetails.find(admin => admin.email === editEmail);
            if (!adminToUpdate) {
                alert('Admin not found.');
                return;
            }

            const updatedAdmin = {
                email: editEmail,
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
            };

            dispatch(updateAdmin(updatedAdmin));

            setAdminDetails(prevDetails =>
                prevDetails.map(admin =>
                    admin.email === editEmail
                        ? { ...admin, ...updatedAdmin }
                        : admin
                )
            );

            setIsEditing(false);
            setEditEmail(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);

            dispatch(addAdmin(formData));

            setAdminDetails(prevAdminDetails => [
                ...prevAdminDetails,
                {
                    email: formData.email,
                    name: formData.name,
                    address: formData.address,
                    phone: formData.phone,
                },
            ]);

            dispatch(resetFormData());
        }
    };


    function handleDelete(e, admins: Admins) {

        e.preventDefault();
        e.stopPropagation();

        if (!admins.email) {
            alert("Admin email is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete admin "${admins.name}"?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteAdmin(admins.email));
            } catch (error) {
                console.log(error)
                alert('Failed to delete admin. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, admin: Admins) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for admin:', admin.email);

        setIsEditing(true);
        setEditEmail(admin.email);

        const formDataToSet = {
            email: admin.email || '',
            name: admin.name || '',
            phone: admin.phone || '',
            address: admin.address || '',
            adminId: admin.id || '',
            userId: admin.userId || ''
        };

        Object.entries(formDataToSet).forEach(([name, value]) => {
            dispatch(updateFormData({ name, value }));
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Admin</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Email"
                        placeholder="Enter Admin email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Name"
                        placeholder="Enter the name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Phone"
                        placeholder="Enter contact number"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Address"
                        placeholder="Enter the address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                    />

                </div>
                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="crops-table-sec">
                    <div className="crop-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="custom-table-th">Email</th>
                                    <th className="custom-table-th">Name</th>
                                    <th className="custom-table-th">Phone</th>
                                    <th className="custom-table-th">Address</th>
                                    <th className="custom-table-th">Action</th>
                                </tr>
                            </thead>
                            <tbody id="my-table">

                                {adminDetails.map(admin => (
                                    <tr
                                        key={admin.email}
                                    >
                                        <td className="custom-table-td">{admin.email}</td>
                                        <td className="custom-table-td">{admin.name}</td>
                                        <td className="custom-table-td">{admin.phone}</td>
                                        <td className="custom-table-td">{admin.address}</td>
                                        <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                            <button
                                                onClick={(e) => handleEditClick(e, admin)}
                                                className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                            >
                                                <PencilSquareIcon className="w-5 h-5 "/>
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, admin)}
                                                className="bg-[#ef4444] text-black px-4 py-2 mt-1 rounded hover:bg-[#f87171]"
                                            >
                                                <TrashIcon className="w-5 h-5 "/>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </section>

            </form>
        </>
    );
}