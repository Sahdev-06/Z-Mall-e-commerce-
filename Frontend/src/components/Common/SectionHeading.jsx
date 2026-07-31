import { useNavigate } from "react-router-dom"

function SectionHeading({ title, showViewAll, type }) {
    const navigate = useNavigate();

    function handleNavigate() {
        navigate(`/products/${type}`)
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    {title}
                </h1>
                {
                    showViewAll && (
                        <button
                            className="text-orange-500 hover:underline cursor-pointer"
                            onClick={handleNavigate}
                        >
                            view all
                        </button>
                    )
                }
            </div>
        </>
    )
}


export default SectionHeading