import StarterIcon from "../icons/StarterIcon";
import MainCourseIcon from "../icons/MainCourseIcon";
import DessertIcon from "../icons/DessertIcon";

const categories = [
    {
        category: "Starters",
        icon: <StarterIcon className="size-13.5 mb-4.5 mx-auto" />,
        active: true
    },
    {
        category: "Main Courses",
        icon: <MainCourseIcon className="size-13.5 mb-4.5 mx-auto" />,
        active: false
    },
    {
        category: "Desserts",
        icon: <DessertIcon className="size-13.5 mb-4.5 mx-auto" />,
        active: false
    }
];

export default function Categories() {

    return (
        <section className="py-16 px-8 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-serif text-teal-900 mb-4">Curated Categories</h2>
                <p className="text-gray-600">Explore our diverse menu of culinary delights.</p>
            </div>
            <div className="flex flex-row justify-center gap-6">
                {
                    categories.map((cat) => (
                        <div key={cat.category} className={`${cat.active ? "bg-secondary shadow-xl" : "bg-[#FBFAF8]"} rounded-tl-2xl rounded-br-2xl py-4 px-15 text-center hover:shadow-lg transition`}>
                            {cat.icon}
                            <h3 className="text-xl font-semibold text-primary">{cat.category}</h3>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}
