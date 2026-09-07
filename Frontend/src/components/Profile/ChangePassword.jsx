import { useState } from "react";
import { useToast } from "../../context/ToastContext.jsx";
import { changeCurrentPassword } from "../../services/authService.js";
import { ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const navigate = useNavigate();

    const { showToast } = useToast();

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

        // Old password validation
        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = "Old password is required.";
        }

        // New password validation
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New password is required.";
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword =
                "New password must be at least 8 characters.";
        } else if (!/[A-Z]/.test(formData.newPassword)) {
            newErrors.newPassword =
                "New password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(formData.newPassword)) {
            newErrors.newPassword =
                "New password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(formData.newPassword)) {
            newErrors.newPassword =
                "New password must contain at least one number.";
        } else if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/'`~+=;]/.test(formData.newPassword)) {
            newErrors.newPassword =
                "New password must contain at least one special character.";
        }

        // Old and new password should not be same
        if (
            formData.oldPassword &&
            formData.newPassword &&
            formData.oldPassword === formData.newPassword
        ) {
            newErrors.newPassword =
                "New password must be different from old password.";
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

        setIsSubmitting(true)

        // API logic goes here
        try {
            const data = {
                oldPassword : formData.oldPassword,
                newPassword : formData.newPassword
            }

            const result = await changeCurrentPassword(data)
            formData.oldPassword = ""
            formData.newPassword = ""
            showToast("Password changed", "success")
        } catch (error) {
            showToast("failed to change password", "error")
        } finally {
            setIsSubmitting(false)
        }
    };

    return (
    <section className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {/* Mobile Back */}
        <button
            type="button"
            onClick={() => navigate("/profile")}
            className="
                mb-4 flex items-center gap-1
                text-sm font-medium text-slate-600
                transition-colors
                hover:text-orange-500
                md:hidden
            "
        >
            <ChevronLeft className="h-4 w-4" />
            <span>My Account</span>
        </button>
        
        {/* Header */}
        <div>
            <h2 className="text-lg font-semibold text-slate-900">
                Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Choose a strong password to keep your account secure
            </p>
        </div>

        {/* Form */}
        <form
            className="mt-6 space-y-5"
            onSubmit={handleSubmit}
            noValidate
        >
            {/* Old Password */}
            <div>
                <label
                    htmlFor="oldPassword"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    Old password
                </label>

                <input
                    id="oldPassword"
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your old password"
                    className={`
                        w-full rounded-xl border
                        ${
                            errors.oldPassword
                                ? "border-red-500"
                                : "border-slate-200"
                        }
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-orange-500
                        focus:ring-2 focus:ring-orange-100
                    `}
                />

                {errors.oldPassword && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.oldPassword}
                    </p>
                )}
            </div>

            {/* New Password */}
            <div>
                <label
                    htmlFor="newPassword"
                    className="mb-2 block text-sm font-medium text-slate-700"
                >
                    New password
                </label>

                <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className={`
                        w-full rounded-xl border
                        ${
                            errors.newPassword
                                ? "border-red-500"
                                : "border-slate-200"
                        }
                        bg-white px-4 py-3
                        text-sm text-slate-900
                        outline-none transition
                        placeholder:text-slate-400
                        focus:border-orange-500
                        focus:ring-2 focus:ring-orange-100
                    `}
                />

                {errors.newPassword && (
                    <p className="mt-2 text-sm text-red-500">
                        {errors.newPassword}
                    </p>
                )}
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
                    {isSubmitting ? "Updating..." : "Update password"}
                </button>
            </div>
        </form>
    </section>
);
}

export default ChangePassword;