import { useNavigate, useLocation } from "react-router-dom"


function NoAddress() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <div className="flex flex-1 min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700">
                        You haven’t added any addresses yet.
                    </p>

                    <button
                        onClick={() => navigate("/address/create", {
                            state : { from : location }
                        })}
                        className="text-sm md:text-base text-white bg-orange-500 transition px-2 py-1.5
                                    rounded-lg hover:bg-orange-600 mt-2"      
                    >
                        + New Address
                    </button>
                </div>
            </div>
        </>
    )
}


export default NoAddress