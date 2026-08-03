import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../services/authService.js"
import Logo from "../components/Header/Logo"
import validateUser from "../utils/userValidation.js"

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateUser(formData)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true)

        try {
            const userData = {
                fullName : formData.fullName,
                email : formData.email,
                phone : formData.phone,
                password : formData.password
            }

            const result = await registerUser(userData)
            navigate("/")
        } catch (error) {
            console.log(error)
        } finally {
            setIsSubmitting(false)
        }
        
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6
                            flex-col gap-6">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
                    <div>
                        <div className="flex justify-center">
                            <Logo theme={'text-slate-900 font-bold text-2xl'} />
                        </div>
                        <p className="text-gray-600 text-center mt-2 mb-8">
                            Create Your Account
                        </p>
                    </div>
                    <div>
                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />

                                {errors.fullName && (
                                    <p className="text-sm text-red-500">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />

                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />

                                {errors.phone && (
                                    <p className="text-sm text-red-500">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                                outline-none focus:border-orange-500 focus:ring-2 
                                                focus:ring-orange-200 transition"
                                />

                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white 
                                                font-semibold py-3 rounded-xl transition duration-300
                                                disabled:bg-orange-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {
                                    isSubmitting ? 
                                    "Resigtering..." :
                                    "Register"
                                }
                            </button>
                        </form>
                    </div>

                    <div>
                        <p className="text-sm text-center text-gray-600 mt-6">
                            Already have an account?{" "}
                            <span className="text-orange-500 font-medium hover:underline">
                                <Link to="/login">Login</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Register