import { Home, BriefcaseBusiness, MapPin, Phone, Pencil, Trash2, Check } from "lucide-react";
import { useAddress } from "../../context/AddressContext"
import { useNavigate } from "react-router-dom";


function AddressCard({ _id, fullName, phoneNumber, street, city, state, postalCode, landmark, 
    addressType, isDefault }) {

    const { handleDeleteAddress, handleSetDefaultAddress } = useAddress();
    const navigate = useNavigate();

    return (
        <>
            <article 
                className={[
                    "relative w-full  rounded-xl border bg-white p-4",
                    "shadow-sm transition-colors",
                    "sm:p-5",
                    isDefault
                        ? "border-orange-500 ring-1 ring-orange-500"
                        : "border-gray-200",
                ].join(" ")}
                onClick={() => handleSetDefaultAddress(_id)}
            >
                {/* Top Section */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                        {/* Address icon */}
                        <div
                            className={[
                                "flex size-10 shrink-0 items-center justify-center rounded-lg",
                                "sm:size-11",
                                addressType === "Home"
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-blue-50 text-blue-600",
                            ].join(" ")}
                        >
                            {addressType === "Home" ? (
                                <Home className="size-5 sm:size-[22px]" strokeWidth={2} />
                            ) : (
                                <BriefcaseBusiness
                                    className="size-5 sm:size-[22px]"
                                    strokeWidth={2}
                                />
                            )}
                        </div>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="truncate text-sm font-semibold text-gray-900 sm:text-base">
                                    {fullName}
                                </h3>
    
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 
                                                text-[11px] font-medium capitalize text-gray-600">
                                    {addressType}
                                </span>
    
                                {isDefault && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 
                                                text-[11px] font-medium text-orange-600">
                                        <Check className="size-3" strokeWidth={2.5} />
                                        Default
                                    </span>
                                )}
                            </div>
    
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 sm:text-sm">
                                <Phone className="size-3.5 shrink-0 sm:size-4" />
                                <span>{phoneNumber}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-1">
                        <button
                            type="button"
                            aria-label="Edit address"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/address/edit/${_id}`)
                            }}
                            className="flex size-9 items-center justify-center rounded-lg text-gray-500 
                                        hover:bg-gray-100 hover:text-gray-900"
                        >
                            <Pencil className="size-4" />
                        </button>

                        <button
                            type="button"
                            aria-label="Delete address"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(_id)
                            }}
                            className="flex size-9 items-center justify-center rounded-lg text-gray-500 
                                    hover:bg-red-50 hover:text-red-600"
                        >
                            <Trash2 className="size-4" />
                        </button>
                    </div>
                </div>

                {/* Address */}
                <div className="mt-4 flex gap-2.5 border-t border-gray-100 pt-4">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gray-400" />
    
                    <div className="min-w-0 text-xs leading-5 text-gray-600 sm:text-sm sm:leading-6">
                        <p>
                            {street}, {city}, {state} -{" "}
                            {postalCode}
                        </p>
    
                        <p className="text-gray-400">{landmark}</p>
                    </div>
                </div>
            </article>
        </>
    )
}


export default AddressCard