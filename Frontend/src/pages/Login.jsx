import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService.js"
import Logo from "../components/Header/Logo"


function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }

    function validateUser() {
        const newErrors = {};

        // Email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            newErrors.email = "Email is required."
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = "Invalid email format.";
        }

        // Password
        if (!formData.password.trim()) {
            newErrors.password = "Password is required."
        } else if (formData.password.trim().length < 8) {
            newErrors.password = "Password must be at least 8 character."
        }

        setErrors(newErrors)

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!validateUser()) return;

        setIsSubmitting(true)

        try {
            const userData = {
                email: formData.email,
                password: formData.password
            }

            const result = await loginUser(userData)
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
                            Login to continue shopping
                        </p>
                    </div>
                    <div>
                        <form
                            className="flex flex-col gap-5"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input 
                                    type="text"
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
                            <button
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white  
                                    font-semibold py-3 rounded-xl transition duration-300 disabled:bg-orange-300"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Login
                            </button>
                        </form>
                    </div>

                    <div>
                        <p className="text-sm text-center text-gray-600 mt-6">
                            Don't have an account?{" "}
                            <span className="text-orange-500 font-medium hover:underline">
                                <Link to="/register">Create Account</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default LoginForm