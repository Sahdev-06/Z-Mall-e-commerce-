import { useState } from "react"
import { featuredProduct } from "../../services/productService"

function ToggleSwitch({ _id, checked }) {
    const [isOn, setIsOn] = useState(checked);
    const [loading, setLoading] = useState(false);

    async function toggle() {
        if (loading) return;

        setLoading(true);
        setIsOn(prev => !prev);

        try {
            await featuredProduct(_id);
        } catch (error) {
            console.log(error);
            setIsOn(prev => !prev); // Rollback if API fails
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className={`
                ${isOn ? "bg-green-500" : "bg-gray-300"}
                ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                p-1 w-11 h-6 rounded-2xl
            `}
            onClick={toggle}
        >
            <div
                className={`
                    bg-white h-4 w-4 rounded-full
                    transition-all duration-300
                    ${isOn ? "translate-x-5" : "translate-x-0"}
                `}
            />
        </div>
    );
}



export default ToggleSwitch