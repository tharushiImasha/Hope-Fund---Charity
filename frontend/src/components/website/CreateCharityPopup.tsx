import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store/Store.ts";
import {useState} from "react";
import {Category, Causes} from "../../models/dashboard/Causes.ts";
import {resetFormData, updateFormData} from "../../reducers/FormSlice.ts";
import {addCause, updateCause} from "../../reducers/CauseSlice.ts";
import {Inputs} from "../dashboard/Inputs.tsx";
import {SelectField} from "../dashboard/SelectField.tsx";
import {AddButton} from "../dashboard/AddButton.tsx";
import {useNavigate} from "react-router-dom";

export function CreateCharityPopup() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const formData = useSelector((state) => state.formData);
    const causes = useSelector((state) => state.cause );
    const [selectedValue, setSelectedValue] = useState('');

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editFieldId, setEditFieldId] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFile, setPdfFile] = useState<string | null>(null);

    const categories: Category[] = ["Health", "Education",  "Animal", "Cancer"];

    const generateCauseId = () => {
        const randomPart = Math.random().toString(36).substr(2, 9);
        return `CP${randomPart}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFormData({name, value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const causeId = generateCauseId();
        const formDataObj = new FormData();

        formDataObj.append('causeId', causeId);

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

        formDataObj.append('verifiedStatus', 'Pending');
        dispatch(addCause(formDataObj));
        resetForm();

    };

    const resetForm = () => {
        setIsEditing(false);
        setEditFieldId(null);
        setImagePreview(null);
        setPdfFile(null);
        setSelectedValue("");
        dispatch(resetFormData());
    };

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

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
                    <form onSubmit={handleSubmit} className="p-6 rounded-md mt-[80px]">
                        <h2 className="text-[25px] font-bold mb-10">Cause</h2>
                        <div className="grid grid-cols-2 gap-6 gap-x-[50px]">
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
                                        className="w-[10px] h-[10px] float-right"
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

                        <button className="mt-[35px] px-6 py-2 bg-transparent rounded-[26px] border-white border-1 text-md font-semibold shadow-md hover:bg-green-600 transition cursor-pointer" onClick={() => navigate("/")}>
                            Back
                        </button>
                        <AddButton name={"Register"}/>
                    </form>
                </div>
            </div>

        </>
    );
}