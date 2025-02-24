import {useState} from "react";
import "../../style/Crop.css";
import {Inputs} from "../../components/dashboard/Inputs.tsx";
import {AddButton} from "../../components/dashboard/AddButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {Charity} from "../../models/dashboard/Charity.ts";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {addCrop, deleteCrop, updateCrop} from "../../reducers/CharitySlice.ts";
import "../../style/Table.css"
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";

export function Charities() {

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const charity = useSelector((state) => state.charity );

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editCropId, setEditCropId] = useState<string | null>(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editCropId) {
            const updatedCrop = { ...formData, crId: editCropId };
            dispatch(updateCrop(updatedCrop));
            setIsEditing(false);
            setEditCropId(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);
            dispatch(resetFormData());
            dispatch(addCrop(formData));
        }

    };

    function handleDelete(e, charity: Charity) {

        e.preventDefault();
        e.stopPropagation();

        if (!charity.email) {
            alert("Charity code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete crop "${charity.name}" (${charity.name})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteCrop(charity));
            } catch (error) {
                console.log(error)
                alert('Failed to delete crop. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, charity: Charity) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for crop:', charity.email);

        setIsEditing(true);
        setEditCropId(charity.email);

        setTimeout(() => {
            const cropFields = [
                "email",
                "name",
                "address",
                "nic",
            ];

            cropFields.forEach(field => {
                dispatch(updateFormData({
                    name: field,
                    value: charity[field] || ''
                }));
            });

        }, 0);
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Charities</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Email"
                        placeholder="Enter charity Email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Charity Name"
                        placeholder="Enter charity name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Charity Address"
                        placeholder="Enter charity address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Charity NIC"
                        placeholder="Enter charity nic"
                        name="nic"
                        value={formData.nic || ''}
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
                                <th className="custom-table-th">Address</th>
                                <th className="custom-table-th">NIC</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {charity.map((charities: Charity) => (
                                <tr>
                                    <td className="custom-table-td">{charities.email}</td>
                                    <td className="custom-table-td">{charities.name}</td>
                                    <td className="custom-table-td">{charities.address}</td>
                                    <td className="custom-table-td">{charities.nic}</td>
                                    <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                        <button
                                            onClick={(e) => handleEditClick(e, charities)}
                                            className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                        >
                                            <PencilSquareIcon className="w-5 h-5 "/>
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(e, charities)}
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