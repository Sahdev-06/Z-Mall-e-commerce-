import { Inbox } from "lucide-react";

function EmptyState({ title, subtitle }) {
    return (
        <>
            <section className="flex min-h-[50vh] w-full items-center justify-center px-4 
                                py-12 sm:min-h-[55vh] sm:px-6 lg:min-h-[70vh]">
                <div className="flex w-full max-w-md flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-5 flex h-16 w-16 items-center justify-center 
                                    rounded-full bg-gray-100 sm:h-20 sm:w-20">
                        <Inbox
                            className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10"
                            strokeWidth={1.7}
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
                        {title}
                    </h2>

                    {/* Subtitle */}
                    <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
                        {subtitle}
                    </p>
                </div>
            </section>
        </>
    )
}


export default EmptyState