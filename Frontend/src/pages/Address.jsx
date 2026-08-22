import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAddress } from "../context/AddressContext.jsx";
import validateAddress from "../utils/addressValidation.js";
import { MapPin, AlertCircle } from "lucide-react";
import { createAddress, getAddressById, updateAddress } from "../services/addressService.js"

function Address() {

    const { fetchAddresses } = useAddress();
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from;

    const { id } = useParams();

    const mode = id ? "edit" : "add"

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        landmark: "",
        addressType: "Home",
    });

    const [errors, setErrors] = useState({});

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {      
        if(!id) return;

        const fetchAddress = async () => {
            try {
                const result = await getAddressById(id)
                setFormData(result.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAddress();
    }, [id]);

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const validationErrors = validateAddress(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {

            const addressData = {
                fullName : formData.fullName,
                phoneNumber : formData.phoneNumber,
                street : formData.street,
                city : formData.city,
                state : formData.state,
                postalCode : formData.postalCode,
                landmark : formData.landmark,
                addressType : formData.addressType
            }

            if (mode === "add") {

                const result = await createAddress(addressData)
                fetchAddresses()
                navigate(from)

            } else {

                const result = await updateAddress(id, addressData)
                await fetchAddresses()
                navigate(from)

            }

        } catch (error) {

            console.log(error);

        } finally {

            setIsSubmitting(false);

        }

    }

    return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
            {/* Header */}
            <div className="border-b border-slate-200 bg-gradient-to-r from-orange-50 to-white px-5 py-6 sm:px-8">
                <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-sm">
                        <MapPin className="h-5 w-5" strokeWidth={2} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                            {mode === "add"
                                ? "Add New Address"
                                : "Edit Address"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            {mode === "add"
                                ? "Add a new delivery address to your account."
                                : "Update your delivery address details."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="space-y-7 px-5 py-6 sm:px-8 sm:py-8">

                {/* Full Name & Phone */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Full Name
                            <span className="ml-1 text-orange-500">*</span>
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 
                                        placeholder:text-slate-400 outline-none transition-all duration-200
                                ${
                                    errors.fullName
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                        : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                                }`}
                        />

                        {errors.fullName && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Phone Number
                            <span className="ml-1 text-orange-500">*</span>
                        </label>

                        <input
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 
                                        placeholder:text-slate-400 outline-none transition-all duration-200
                                ${
                                    errors.phoneNumber
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                        : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                                }`}
                        />

                        {errors.phoneNumber && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                <span>!</span>
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>
                </div>

                {/* Street Address */}
                <div>
                    <label
                        htmlFor="street"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Street Address
                        <span className="ml-1 text-orange-500">*</span>
                    </label>

                    <textarea
                        id="street"
                        rows="4"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        placeholder="House No, Street, Area..."
                        className={`w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm 
                                text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                            ${
                                errors.street
                                    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                    : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                            }`}
                    />

                    {errors.street && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                            <span>!</span>
                            {errors.street}
                        </p>
                    )}
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* City */}
                    <div>
                        <label
                            htmlFor="city"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            City
                            <span className="ml-1 text-orange-500">*</span>
                        </label>

                        <input
                            id="city"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                                ${
                                    errors.city
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                        : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                                }`}
                        />

                        {errors.city && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                <span>!</span>
                                {errors.city}
                            </p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label
                            htmlFor="state"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            State
                            <span className="ml-1 text-orange-500">*</span>
                        </label>

                        <input
                            id="state"
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                                ${
                                    errors.state
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                        : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                                }`}
                        />

                        {errors.state && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                <span>!</span>
                                {errors.state}
                            </p>
                        )}
                    </div>
                </div>

                {/* Postal Code & Landmark */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {/* Postal Code */}
                    <div>
                        <label
                            htmlFor="postalCode"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Postal Code
                            <span className="ml-1 text-orange-500">*</span>
                        </label>

                        <input
                            id="postalCode"
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder="Enter postal code"
                            className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200
                                ${
                                    errors.postalCode
                                        ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-50"
                                        : "border-slate-300 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                                }`}
                        />

                        {errors.postalCode && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500">
                                <span>!</span>
                                {errors.postalCode}
                            </p>
                        )}
                    </div>

                    {/* Landmark */}
                    <div>
                        <label
                            htmlFor="landmark"
                            className="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Landmark
                            <span className="ml-1 font-normal text-slate-400">
                                (Optional)
                            </span>
                        </label>

                        <input
                            id="landmark"
                            type="text"
                            name="landmark"
                            value={formData.landmark}
                            onChange={handleChange}
                            placeholder="Nearby landmark"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 hover:border-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-50"
                        />
                    </div>
                </div>

                {/* Address Type */}
                <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                        Address Type
                    </label>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {/* Home */}
                        <label
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200
                                ${
                                    formData.addressType === "Home"
                                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                                        : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="addressType"
                                value="Home"
                                checked={formData.addressType === "Home"}
                                onChange={handleChange}
                                className="h-4 w-4 accent-orange-500"
                            />

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Home
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Personal residence
                                </p>
                            </div>
                        </label>

                        {/* Work */}
                        <label
                            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200
                                ${
                                    formData.addressType === "Work"
                                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                                        : "border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50"
                                }`}
                        >
                            <input
                                type="radio"
                                name="addressType"
                                value="Work"
                                checked={formData.addressType === "Work"}
                                onChange={handleChange}
                                className="h-4 w-4 accent-orange-500"
                            />

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    Work
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Office or workplace
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Footer / Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-5 py-5 sm:flex-row sm:justify-end sm:px-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-100 sm:w-auto"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-orange-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {isSubmitting
                        ? "Saving..."
                        : mode === "add"
                            ? "Save Address"
                            : "Update Address"}
                </button>
            </div>
        </form>
    </div>
);
}

export default Address;