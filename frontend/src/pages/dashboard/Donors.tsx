import {Inputs} from "../../components/dashboard/Inputs.tsx";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AddButton} from "../../components/dashboard/AddButton.tsx";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import {addDonor, deleteDonor, getDonor, updateDonor} from "../../reducers/DonorSlice.ts";
import {Donor} from "../../models/dashboard/Donor.ts";
import {getUser} from "../../reducers/UserSlice.ts";

export function Donors() {
    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const donor = useSelector((state) => state.donor );
    const user = useSelector((state) => state.user );

    const [donorDetails, setDonorDetails] = useState([]);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<string | null>(null);

    useEffect(() => {
        if(donor.length === 0){
            dispatch(getDonor())
            dispatch(getUser());
        }
    }, [dispatch, donor.length, user.length]);

    useEffect(() => {
        if (donor.length > 0 && user.length > 0) {
            const newDonorDetails = [];

            for (let i = 0; i < donor.length; i++) {
                let email = "";

                for (let j = 0; j < user.length; j++) {
                    if (donor[i].userId === user[j].userId) {
                        email = user[j].email;
                        break;
                    }
                }

                newDonorDetails.push({
                    email: email,
                    name: donor[i].name,
                    phone: donor[i].phone,
                });
            }

            setDonorDetails(newDonorDetails);

            console.log(newDonorDetails);
        }
    }, [donor, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editEmail) {
            const donorToUpdate = donorDetails.find(donor => donor.email === editEmail);
            if (!donorToUpdate) {
                alert('Donor not found.');
                return;
            }

            const updatedDonor = {
                email: editEmail,
                name: formData.name,
                phone: formData.phone,
            };

            dispatch(updateDonor(updatedDonor));

            setDonorDetails(prevDetails =>
                prevDetails.map(donor =>
                    donor.email === editEmail
                        ? { ...donor, ...updatedDonor }
                        : donor
                )
            );

            setIsEditing(false);
            setEditEmail(null);
            dispatch(resetFormData());
        } else {
            console.log(formData);

            dispatch(addDonor(formData));
            setDonorDetails(prevDonorDetails => [
                ...prevDonorDetails,
                {
                    email: formData.email,
                    name: formData.name,
                    phone: formData.phone,
                },
            ]);

            dispatch(resetFormData());
        }

    };

    function handleDelete(e, donor: Donor) {

        e.preventDefault();
        e.stopPropagation();

        if (!donor.email) {
            alert("Donors email is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete donor "${donor.name}" (${donor.email})?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteDonor(donor.email));
            } catch (error) {
                console.log(error)
                alert('Failed to delete donor. Please try again.');
            }

        }

    }

    const handleEditClick = (e: React.MouseEvent, donor: Donor) => {
        e.preventDefault();
        e.stopPropagation();

        setIsEditing(true);
        setEditEmail(donor.email);

        const formDataToSet = {
            email: donor.email || '',
            name: donor.name || '',
            phone: donor.phone || '',
            adminId: donor.donorId || '',
            userId: donor.userId || ''
        };

        Object.entries(formDataToSet).forEach(([name, value]) => {
            dispatch(updateFormData({ name, value }));
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Donor</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Name"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Contact Number"
                        placeholder="Enter donor's contact number"
                        type="number"
                        name="phone"
                        value={formData.phone || ''}
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
                                    <th className="custom-table-th">Contact Number</th>
                                    <th className="custom-table-th">Action</th>
                                </tr>
                                </thead>
                                <tbody id="my-table">
                                {donorDetails.map(donors => (
                                    <tr key={donors.email}>
                                        <td className="custom-table-td">{donors.email}</td>
                                        <td className="custom-table-td">{donors.name}</td>
                                        <td className="custom-table-td">{donors.phone}</td>
                                        <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                            <button
                                                onClick={(e) => handleEditClick(e, donors)}
                                                className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" /> {/* Removed extra space */}
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, donors)}
                                                className="bg-[#ef4444] text-black px-4 py-2 mt-1 rounded hover:bg-[#f87171]"
                                            >
                                                <TrashIcon className="w-5 h-5" />
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