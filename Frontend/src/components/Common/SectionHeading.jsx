import { Link } from "react-router-dom";

function SectionHeading({ title, showViewAll, type }) {

    return (
        <>
            <div className="flex items-center justify-between">
                {/* Section title */}
                <h1 className="mb-4 text-xl font-semibold text-slate-900 sm:text-2xl lg:text-3xl
                            min-w-0 truncate">
                    {/* {title} */}
                </h1>
                {
                    showViewAll && (
                        <Link
                            to={`/products/${type}`}
                            className="text-sm text-orange-500 hover:underline sm:text-base"
                            
                        >
                            view all
                        </Link>
                    )
                }
            </div>
        </>
    )
}


export default SectionHeading