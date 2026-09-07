import { MapPin, Phone, User } from "lucide-react";

function OrderCustomerInfo({ info }) {
  const { fullName, street, city, state, phoneNumber, postalCode, landmark } = info

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-[#0B1F3A]">
          Customer Information
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Customer and delivery information for this order.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Customer */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Customer
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
                <User size={17} />
              </div>

              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="text-sm font-medium text-gray-800">
                  { fullName }
                </p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#0B1F3A]">
                <Phone size={17} />
              </div>

              <div>
                <p className="text-xs text-gray-400">Phone</p>
                <p className="text-sm font-medium text-gray-800">
                  +91 { phoneNumber }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Shipping Address
          </h3>

          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F97316]">
              <MapPin size={17} />
            </div>

            <div>
              <p className="text-sm font-medium leading-6 text-gray-800">
                { fullName }
                <br />
                { street }, { landmark }
                <br />
                { city }, { state } - { postalCode}
                <br />
                India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderCustomerInfo;