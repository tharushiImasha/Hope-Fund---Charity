import {useDispatch, useSelector} from "react-redux";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {Inputs} from "../../components/dashboard/Inputs.tsx";
import {AddButton} from "../../components/dashboard/AddButton.tsx";
import {useState} from "react";
import {addAdmin, deleteAdmin, updateAdmin} from "../../reducers/AdminSlice.ts";
import {Admins} from "../../models/dashboard/Admins.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";

export function Admin() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const admin = useSelector((state) => state.admin );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editVehicleId, setEditVehicleId] = useState<string | null>(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editVehicleId) {
            const updatedAdmin = { ...formData, email: editVehicleId };
            dispatch(updateAdmin(updatedAdmin));
            setIsEditing(false);
            setEditVehicleId(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            dispatch(addAdmin(formData));
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
                dispatch(deleteAdmin(admins));
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
        setEditVehicleId(admin.email);

        setTimeout(() => {
            const adminFields = [
                "adminId",
                "email",
                "name",
                "phone",
                "address",
                "userId"
            ];

            adminFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: admin[field] || ''
                }));
            });

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

                            {admin.map((admins: Admins) => (
                                <tr>
                                    <td className="custom-table-td">{admins.email}</td>
                                    <td className="custom-table-td">{admins.name}</td>
                                    <td className="custom-table-td">{admins.phone}</td>
                                    <td className="custom-table-td">{admins.address}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, admins)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, admins)}
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