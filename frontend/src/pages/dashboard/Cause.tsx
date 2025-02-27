import {useDispatch, useSelector} from "react-redux";
import {Inputs} from "../../components/dashboard/Inputs.tsx";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {AddButton} from "../../components/dashboard/AddButton.tsx";
import {useEffect, useState} from "react";
import {Category, Causes, Status} from "../../models/dashboard/Causes.ts";
import {addCause, deleteCause, getCause, updateCause} from "../../reducers/CauseSlice.ts";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {TrashIcon} from "@heroicons/react/16/solid";
import "../../style/Table.css"
import {SelectField} from "../../components/dashboard/SelectField.tsx";
import {AppDispatch} from "../../store/Store.ts";

export function Cause() {

    const dispatch = useDispatch<AppDispatch>();
    const formData = useSelector((state) => state.formData);
    const causes = useSelector((state) => state.cause );
    const [selectedValue, setSelectedValue] = useState('');

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editFieldId, setEditFieldId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFile, setPdfFile] = useState<string | null>(null);

    const categories: Category[] = ["Health", "Education",  "Animal", "Cancer"];

    useEffect(() => {
        if(causes.length === 0){
            dispatch(getCause())
        }
    }, [dispatch, causes.length]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing && editFieldId) {
            const updatedCauses = { ...formData, causeId: editFieldId };
            dispatch(updateCause(updatedCauses));
            setIsEditing(false);
            setEditFieldId(null);
            setImagePreview(null);
            setPdfFile(null);
            setSelectedValue("");
            dispatch(resetFormData());
        } else {
            const formDataObj = new FormData();

            Object.keys(formData).forEach(key => {
                if (key !== 'image' && key !== 'documentation') {
                    formDataObj.append(key, formData[key]);
                }
            });

            if (imagePreview && document.getElementById('image').files[0]) {
                formDataObj.append('image', document.getElementById('image').files[0]);
            }

            if (pdfFile && document.getElementById('documentation').files[0]) {
                formDataObj.append('documentation', document.getElementById('documentation').files[0]);
            }

            // Add verification status
            formDataObj.append('verifiedStatus', 'Pending');

            // Dispatch the action with FormData
            dispatch(addCause(formDataObj));
            resetForm();
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditFieldId(null);
        setImagePreview(null);
        setPdfFile(null);
        setSelectedValue("");
        dispatch(resetFormData());
    };

    function handleDelete(e, cause: Causes) {
        e.preventDefault();
        e.stopPropagation();

        if (!cause.causeId) {
            alert("Causes code is required to delete an item.");
            return;
        }

        const confirmDelete = window.confirm(
            `Are you sure you want to delete cause "${cause.causeId}"?`
        );

        if (confirmDelete) {
            try {
                dispatch(deleteCause(cause));
            } catch (error) {
                console.log(error)
                alert('Failed to delete cause. Please try again.');
            }
        }
    }

    const handlePDFUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPdfFile(reader.result as string);
                dispatch(updateFormData({ name: "documentation", value: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                dispatch(updateFormData({name: "image", value: reader.result}));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStatusChange = (e, causeId, newStatus) => {
        e.preventDefault();
        e.stopPropagation();

        const existingCause = causes.find((cause) => cause.causeId === causeId);
        if (!existingCause) {
            alert("Cause not found!");
            return;
        }

        // Create updated cause object
        const updatedCause = {
            ...existingCause,
            verifiedStatus: newStatus,
        };

        // Dispatch update action
        dispatch(updateCause(updatedCause))
            .unwrap()
            .then(() => {
                alert(`Status updated to ${newStatus}`);
            })
            .catch((error) => {
                console.error("Failed to update status:", error);
                alert(`Failed to update status. Please try again.`);
            });
    };


    const handleEditClick = (e: React.MouseEvent, cause: Causes) => {
        e.preventDefault();
        e.stopPropagation();

        console.log('Starting edit process for field:', cause.causeId);

        setIsEditing(true);
        setEditFieldId(cause.causeId);

        setTimeout(() => {
            const causeFields = [
                "causeId",
                "title",
                "description",
                "documentation",
                "date",
                "category",
                "location",
                "image",
                "goalAmount",
                "raisedAmount",
                "verifiedStatus",
                "crId",
                "adminId",
            ];

            causeFields.forEach(data => {
                dispatch(updateFormData({
                    name: data,
                    value: cause[data] || ''
                }));
            });

            setImagePreview(cause.image || null);
            setSelectedValue(cause.category || "");
            setPdfFile(cause.documentation || null);
        }, 0);
    };

    // Helper function to check if a string is a valid base64 data URL
    const isBase64DataUrl = (str: string) => {
        if (!str) return false;
        return str.startsWith('data:');
    };

    // Function to create an object URL from base64 data for PDF preview
    const createPdfObjectUrl = (base64Data: string) => {
        if (!base64Data) return null;

        try {
            // Check if it's a data URL and split into parts
            const [dataType, base64String] = base64Data.split(';base64,');
            const mimeType = dataType.split(':')[1] || 'application/pdf'; // Default to PDF

            const byteCharacters = atob(base64String || base64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, { type: mimeType });
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Error creating PDF object URL:", error);
            return null;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="p-6 rounded-md mt-[80px]">
                <h2 className="text-[25px] font-bold mb-10">Cause</h2>
                <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
                    <Inputs
                        label="Cause ID"
                        placeholder="Enter cause ID"
                        name="causeId"
                        value={formData.causeId || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Title"
                        placeholder="Enter cause title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Cause Description"
                        placeholder="Enter cause description"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                    <Inputs
                        label="Cause Date"
                        placeholder="Enter the date"
                        type="date"
                        name="date"
                        value={formData.date || ''}
                        onChange={handleChange}
                    />
                    <SelectField
                        label="Category"
                        name="category"
                        value={selectedValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSelectedValue(value);
                            dispatch(updateFormData({ name: "category", value }));
                        }}
                        options={categories.map((category) => ({
                            value: category,
                            label: category,
                        }))}
                    />

                    <Inputs
                        label="Cause Loaction"
                        placeholder="Enter cause location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleChange}
                    />

                    <Inputs
                        label="Cause Goal Amount"
                        placeholder="Enter cause goal amount"
                        type="number"
                        name="goalAmount"
                        value={formData.goalAmount || ''}
                        onChange={handleChange}
                    />

                    <Inputs
                        label="Raised Amount"
                        placeholder="Enter raised amount"
                        type="number"
                        name="raisedAmount"
                        value={formData.raisedAmount || ''}
                        onChange={handleChange}
                    />

                    <div className="flex flex-col w-full">
                        <label htmlFor="image" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                            Cause Image
                        </label>
                        <div
                            className="border border-gray-300 rounded-[10px] text-center cursor-pointer shadow-sm focus:outline-none focus:ring-1 focus:ring-[#026664af] focus:border-[#026664af] text-[12px] flex justify-between items-center w-full h-[38px] px-3 py-2 bg-[transparent]"
                            onClick={() => document.getElementById('image').click()}
                        >
                            Click to upload (Max Size 10MB)
                            <img
                                src="/dashboard/assets/photo.png"
                                alt="photo-icon"
                                className="w-[18px] h-[18px] float-right"
                            />
                        </div>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            style={{display: 'none'}}
                            onChange={handleImageUpload}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="mt-3 border rounded-lg max-w-[250px] h-auto max-h-[250px]"
                            />
                        )}
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="documentation" className="block text-[12px] font-medium text-gray-700 mb-3 font-bold">
                            Upload Documentation (PDF)
                        </label>
                        <div className="flex w-full items-center gap-4 mt-2">
                            <div className="relative">
                                <input
                                    type="file"
                                    id="documentation"
                                    accept="application/pdf"
                                    onChange={handlePDFUpload}
                                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                />
                                <label
                                    htmlFor="documentation"
                                    className="bg-[#EEFFE2] border border-[#00C424] px-4 py-2 rounded-md cursor-pointer hover:bg-[#DFF6D0] text-[12px]"
                                >
                                    Choose File
                                </label>
                            </div>
                            {pdfFile && (
                                <a
                                    href={pdfFile}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-green-500"
                                >
                                    Preview PDF
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <AddButton name={isEditing ? "Update" : "Register"}/>

                <section className="filed-table-sec">
                    <div className="field-table-div">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                            <tr>
                                <th className="custom-table-th">Cause ID</th>
                                <th className="custom-table-th">Title</th>
                                <th className="custom-table-th">Description</th>
                                <th className="custom-table-th">Documentation</th>
                                <th className="custom-table-th">Date</th>
                                <th className="custom-table-th">Category</th>
                                <th className="custom-table-th">Location</th>
                                <th className="custom-table-th">Image</th>
                                <th className="custom-table-th">Goal Amount (RS.)</th>
                                <th className="custom-table-th">Raised Amount (RS.)</th>
                                <th className="custom-table-th">Verified Status</th>
                                <th className="custom-table-th">Action</th>
                            </tr>
                            </thead>
                            <tbody id="my-table">

                            {causes.map((cause: Causes) => {
                                // Create PDF object URL if PDF exists
                                const pdfObjectUrl = cause.documentation ?
                                    createPdfObjectUrl(cause.documentation) : null;

                                return (
                                    <tr key={cause.causeId}>
                                        <td className="custom-table-td">{cause.causeId}</td>
                                        <td className="custom-table-td">{cause.title}</td>
                                        <td className="custom-table-td">{cause.description}</td>
                                        <td className="custom-table-td">
                                            {cause.documentation ? (
                                                <div className="flex flex-col items-center">
                                                    <a
                                                        href={pdfObjectUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 mb-2"
                                                    >
                                                        Preview PDF
                                                    </a>
                                                    <embed
                                                        src={pdfObjectUrl}
                                                        type="application/pdf"
                                                        className="w-64 h-32" // Adjust size as needed
                                                    />
                                                </div>
                                            ) : (
                                                "No Documentation"
                                            )}
                                        </td>
                                        <td className="custom-table-td">{cause.date}</td>
                                        <td className="custom-table-td">{cause.category}</td>
                                        <td className="custom-table-td">{cause.location}</td>
                                        <td className="custom-table-td">
                                            {cause.image ? (
                                                <img
                                                    src={
                                                        // If the image is a base64 data URL, use it directly
                                                        isBase64DataUrl(cause.image)
                                                            ? cause.image
                                                            : // Otherwise, assume it's a JPEG base64 string (adjust if needed)
                                                            `data:image/jpeg;base64,${cause.image}`
                                                    }
                                                    alt={`Image for ${cause.title}`}
                                                    className="w-20 h-20 object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "/dashboard/assets/no-image.png";
                                                    }}
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td className="custom-table-td">{cause.goalAmount}</td>
                                        <td className="custom-table-td">{cause.raisedAmount}</td>
                                        <td className="custom-table-td">
                                            {cause.verifiedStatus}
                                            {cause.verifiedStatus === "Pending" && (
                                                <div className="mt-2 flex gap-2">
                                                    <button
                                                        className="px-2 py-1 bg-green-500 text-white rounded"
                                                        onClick={(e) => handleStatusChange(e, cause.causeId, "Verified")}
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                                        onClick={(e) => handleStatusChange(e, cause.causeId, "Blocked")}
                                                    >
                                                        Block
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="custom-table-td flex flex-col gap-1 justify-center items-center h-auto">
                                            <button
                                                onClick={(e) => handleEditClick(e, cause)}
                                                className="bg-[#fde047] text-black px-4 py-2 mt-1 rounded hover:bg-[#fef08a]"
                                            >
                                                <PencilSquareIcon className="w-5 h-5"/>
                                            </button>
                                            <button
                                                onClick={(e) => handleDelete(e, cause)}
                                                className="bg-[#ef4444] text-black px-4 py-2 mt-1 rounded hover:bg-[#f87171]"
                                            >
                                                <TrashIcon className="w-5 h-5"/>
                                            </button>
                                        </td>
                                    </tr>
                                )})}
                            </tbody>
                        </table>
                    </div>
                </section>
            </form>
        </>
    );
}