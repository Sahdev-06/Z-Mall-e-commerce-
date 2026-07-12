import CategoryCard from "./CategoryCard"
import headphone from "../../assets/headphone.png"

function CategoryGrid({ categories }) {
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {
                    categories.map(({ name, image }) => (
                        <CategoryCard
                            key={name}
                            name={name}
                            image={image}
                        />
                    ))
                }
            </div>
        </>
    )
}


export default CategoryGrid