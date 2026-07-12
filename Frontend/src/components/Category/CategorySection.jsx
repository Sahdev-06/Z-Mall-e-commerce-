import SectionHeading from "../Common/SectionHeading"
import CategoryGrid from "./CategoryGrid"

function CategorySection({ title, categories}) {
    return (
        <>
            <div>
                <SectionHeading title={title}/>
                <CategoryGrid categories={categories}/>
            </div>
        </>
    )
}


export default CategorySection