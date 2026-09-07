import { useState } from "react";
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { loginAdmin } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            const adminData = {
                email: formData.email,
                password: formData.password,
            };

            const data = await loginAdmin(adminData);

            setUser(data.user);

            navigate("/admin", {
                replace: true,
            });
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.message ||
                "Unable to sign in. Please check your credentials."
            );
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

            {/* Background decoration */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#0f2747]/10 blur-3xl" />
                <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#17365d]/10 blur-3xl" />
            </div>

            {/* Login Container */}
            <div className="relative w-full max-w-md">

                {/* Brand */}
                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0f2747] shadow-lg shadow-[#0f2747]/20">
                        <ShieldCheck
                            className="h-7 w-7 text-white"
                            strokeWidth={1.8}
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Admin Portal
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to manage your store
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(15,39,71,0.20)] sm:p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                                    strokeWidth={1.8}
                                />

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="admin@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    required
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0f2747] focus:bg-white focus:ring-4 focus:ring-[#0f2747]/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400"
                                    strokeWidth={1.8}
                                />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0f2747] focus:bg-white focus:ring-4 focus:ring-[#0f2747]/10"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:text-[#0f2747] focus:outline-none focus:ring-2 focus:ring-[#0f2747]/20"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            className="h-[18px] w-[18px]"
                                            strokeWidth={1.8}
                                        />
                                    ) : (
                                        <Eye
                                            className="h-[18px] w-[18px]"
                                            strokeWidth={1.8}
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-[#0f2747] px-4 text-sm font-semibold text-white shadow-lg shadow-[#0f2747]/15 transition-all duration-200 hover:bg-[#17365d] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#0f2747]/15"
                        >
                            Sign in
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="mt-6 text-center text-xs text-slate-400">
                    Secure access · Admin dashboard
                </p>
            </div>
        </main>
    );
};

export default AdminLogin;