import Image from "next/image";
import MenuItem from "./MenuItem";

const items = [
    { name: "Golden Crunch Bites", price: 15 },
    { name: "Mediterranean Olive Medley", price: 25 },
    { name: "Citrus Swirl Delights", price: 35 },
    { name: "Creamy Garlic Shrimp Pasta", price: 10 },
];

export default function MenuGrid() {
    return (
        <section className="px-10 pb-47.5 pt-37.5 max-w-7xl mx-auto">
            <div className="flex flex-row gap-10 justify-center">
                {items.map((item) => (
                    <MenuItem key={item.name} item={item} />
                ))}
            </div>
        </section>
    );
}
