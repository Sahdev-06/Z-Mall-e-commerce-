import { useNavigate } from "react-router-dom"

function PageHeader({ title, subtitle, buttonText, resource }) {
    const navigate = useNavigate()

    function openForm() {
        navigate(`/admin/${resource}/new`)
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-2xl font-bold text-slate-900">
                        {title}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                        {subtitle}
                    </p>
                </div>
                <button className="bg-orange-500 text-white px-5 py-2.5 hover:bg-orange-600 transition
                                    rounded-xl"
                    onClick={openForm}
                >
                    + {buttonText}
                </button>
            </div>
        </>
    )
}



export default PageHeader