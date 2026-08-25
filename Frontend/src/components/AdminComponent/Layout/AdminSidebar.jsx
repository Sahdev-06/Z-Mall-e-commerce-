import {
  LayoutDashboard,
  Package,
  Tags,
  GitBranch,
  ShoppingCart,
  Users,
  Warehouse,
  TicketPercent,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "Products",
    icon: Package,
    path: "/admin/products",
  },
  {
    label: "Categories",
    icon: Tags,
    path: "/admin/categories",
  },
  {
    label: "Sub Categories",
    icon: GitBranch,
    path: "/admin/sub-categories",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
  },
  {
    label: "Users",
    icon: Users,
    path: "/admin/users",
  },
  {
    label: "Inventory",
    icon: Warehouse,
    path: "/admin/inventory",
  },
  {
    label: "Coupons",
    icon: TicketPercent,
    path: "/admin/coupons",
  },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-72 flex-col
          bg-[#0B1F3A] text-white
          transition-transform duration-300 ease-in-out
          lg:static lg:z-auto lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F97316] 
                            font-bold text-white">
              A
            </div>

            <div>
              <h1 className="text-base font-bold tracking-wide">
                Admin Panel
              </h1>
              <p className="text-[11px] text-white/50">
                Management System
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition 
                            hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
            Main Menu
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    group relative flex items-center gap-3 rounded-lg
                    px-3 py-2.5 text-sm font-medium
                    transition-colors
                    ${
                      isActive
                        ? "bg-[#F97316] text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }
                    `
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                    className="shrink-0"
                  />

                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-white/5 px-3 py-3">
            <p className="text-xs font-medium text-white/70">
              Admin Panel
            </p>
            <p className="mt-0.5 text-[11px] text-white/40">
              v1.0.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
