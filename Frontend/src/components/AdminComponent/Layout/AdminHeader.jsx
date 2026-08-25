import { useState } from "react";
import {
  Bell,
  Menu,
  Search,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";

const AdminHeader = ({ onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 flex h-16 items-center border-b border-gray-200
            bg-white px-4 sm:px-6"
    >
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
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

        {/* Search */}
        <div className="hidden max-w-md flex-1 md:block">
          <div className="relative">
            <Search
              size={19}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm 
                    text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#0B1F3A] 
                    focus:bg-white focus:ring-2 focus:ring-[#0B1F3A]/10"
            />
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 
                        transition-colors hover:bg-gray-100 hover:text-[#0B1F3A] md:hidden"
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 
                        transition-colors hover:bg-gray-100 hover:text-[#0B1F3A]"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#F97316] ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-gray-200 sm:block" />

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-50 
                        focus:outline-none focus:ring-2 focus:ring-[#0B1F3A]/10"
          >
            {/* Avatar */}
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] 
                            text-sm font-semibold text-white"
            >
              AD
            </div>

            {/* User info */}
            <div className="hidden text-left lg:block">
              <p className="text-sm font-semibold leading-5 text-gray-900">
                Admin
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
            <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  Admin
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Administrator
                </p>
              </div>

              <div className="p-1.5">
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium 
                            text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#0B1F3A]"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium 
                            text-red-600 transition-colors hover:bg-red-50"
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