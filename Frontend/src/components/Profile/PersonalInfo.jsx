import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { updateAccount } from "../../services/authService.js";

function PersonalInfo() {
    const { user, setUser } = useAuth();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        fullName: user.fullName,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error for the field being edited
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "fullName is required.";
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName =
                "fullName must be at least 3 characters.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                fullName: formData.fullName,
            };

            const result = await updateAccount(data);

            setUser(result.data);

            showToast("fullName updated successfully", "success");
        } catch (error) {
            showToast("Failed to update fullName", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            {/* Header */}
            <div>
                <h2 className="text-lg font-semibold text-slate-900">
                    Personal Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Update your personal details
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="mt-6 space-y-5">
                    {/* Full Name */}
                    <div>
                        <label
                            htmlFor="fullName"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Full name
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="
                                w-full rounded-xl border border-slate-200
                                bg-white px-4 py-3
                                text-sm text-slate-900
                                outline-none
                                transition
                                placeholder:text-slate-400
                                focus:border-orange-500
                                focus:ring-2 focus:ring-orange-100
                            "
                        />

                        {errors.fullName && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Email address
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={user.email}
                            readOnly
                            className="
                                w-full rounded-xl border border-slate-200
                                bg-slate-100 px-4 py-3
                                text-sm text-slate-500
                                outline-none
                                cursor-not-allowed
                            "
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Phone number
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            value={user.phone}
                            readOnly
                            className="
                                w-full rounded-xl border border-slate-200
                                bg-slate-100 px-4 py-3
                                text-sm text-slate-500
                                outline-none
                                cursor-not-allowed
                            "
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end border-t border-slate-100 pt-5">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            w-full rounded-xl
                            bg-orange-500 px-5 py-3
                            text-sm font-semibold text-white
                            transition
                            hover:bg-orange-600
                            active:scale-[0.99]
                            disabled:cursor-not-allowed
                            disabled:bg-orange-300
                            sm:w-auto
                        "
                    >
                        {isSubmitting ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default PersonalInfo;
