import { Mail, Phone, User } from "lucide-react";

function UserInformation() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          User Information
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Basic information about this customer.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
            <User size={17} />
          </div>

          <p className="text-xs text-gray-400">
            Full Name
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            Rahul Sharma
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
            <Mail size={17} />
          </div>

          <p className="text-xs text-gray-400">
            Email Address
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-gray-800">
            rahul@example.com
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-4">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-[#F97316]">
            <Phone size={17} />
          </div>

          <p className="text-xs text-gray-400">
            Phone Number
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-800">
            +91 98765 43210
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserInformation;