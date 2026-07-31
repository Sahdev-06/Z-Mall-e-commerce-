
function BottomSection() {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4
                            px-6 lg:px-10 py-6 border-t border-black">
                <div>
                    <p className="text-gray-400 text-sm">
                        &copy; 2026 ShpeEase. All rights reserved
                    </p>
                </div>
                <div>
                    <p className="text-white text-sm">
                        Crafted with &#10084; by  
                        <span className="font-semibold text-orange-500"> Sahdev Kumar</span>
                    </p>
                </div>
            </div>
        </>
    )
}


export default BottomSection