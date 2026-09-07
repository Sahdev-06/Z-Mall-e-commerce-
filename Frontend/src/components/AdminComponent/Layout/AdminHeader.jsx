import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../../services/authService";
import { useAuth } from "../../../context/AuthContext";
import {
  Menu,
  ChevronDown,
  LogOut,
  User,
  Circle,
} from "lucide-react";

const AdminHeader = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // logout user
  const handleLogout = async () => {
    try {
      await logoutUser()
      navigate("/admin/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200
            bg-white px-4 sm:px-6"
    >
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg 
                    text-gray-600 transition-colors hover:bg-gray-100 hover:text-[#0B1F3A] 
                    focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} strokeWidth={2} />
        </button>

        {/* ShopEase Logo */}
        <div className="select-none text-lg font-bold tracking-tight sm:text-xl">
          <span className="text-[#F97316]">Shop</span>
          <span className="text-[#0B1F3A]">Ease</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* System Status */}
        <div
          className="hidden items-center gap-2 rounded-lg bg-green-50 px-3 py-2 sm:flex"
        >
          <Circle
            size={8}
            fill="currentColor"
            className="text-green-500"
          />

          <span className="text-xs font-medium text-green-700">
            Online
          </span>
        </div>

        {/* Mobile Status */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg sm:hidden"
          title="Online"
          aria-label="Online"
        >
          <Circle
            size={9}
            fill="currentColor"
            className="text-green-500"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors 
                      hover:bg-gray-50 focus:outline-none 
                      focus:ring-2 focus:ring-[#0B1F3A]/10"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            {/* Avatar */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center 
                        rounded-full bg-[#0B1F3A] text-sm font-semibold text-white"
            >
              AD
            </div>

            {/* User info */}
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold leading-5 text-gray-900">
                { user ? user.fullName : "Admin"}
              </p>

              <p className="text-xs leading-4 text-gray-500">
                Administrator
              </p>
            </div>

            <ChevronDown
              size={17}
              className={`hidden text-gray-400 transition-transform lg:block ${
                isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Profile Dropdown */}
          {isProfileOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden 
                        rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  { user ? user.fullName : "Admin"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <div className="p-1.5">
                {/* <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 
                            text-sm font-medium text-gray-600 transition-colors 
                            hover:bg-gray-50 hover:text-[#0B1F3A]"
                >
                  <User size={16} />
                  Profile
                </button> */}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 
                            text-sm font-medium text-red-600 transition-colors 
                            hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
