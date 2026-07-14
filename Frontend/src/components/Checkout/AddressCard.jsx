

function AddressCard ({ name, phoneNumber, street, city, state, postalCode, landmark, addressType, isDefault}) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <input type="radio" name="address" id="address" />
                        <span className="font-semibold text-slate-900">
                            Home
                        </span>
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-2
                                    py-1 rounded-full">
                        Default
                    </span>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <div className="flex items-center gap-5">
                        <p className="font-medium text-slate-900">
                            Sahdev
                        </p>
                        <p className="text-gray-600">
                            1234567890
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600 leading-6">
                            4, XYZ Gate, XYZ City, Uttar Pradesh - 125125
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-5">
                    <button className="px-4 py-1 text-sm border rounded-lg hover:bg-gray-100 
                                        transition">
                        Edit
                    </button>
                    <button className="px-4 py-1 text-sm bg-red-500 hover:bg-red-600 text-white
                                        rounded-lg transition">
                        Delete
                    </button>
                </div>
            </div>
        </>
    )
}


export default AddressCard