import { ItemType } from "@/app/page";
import MenuItem from "./MenuItem";

interface MenuGridProps {
    items: ItemType[];
    className?: string;
}

export default function MenuGrid({ items, className }: MenuGridProps) {
    return (
        <section className={`pb-47.5 max-w-309 mx-auto ${className}`}>
            <div className="flex flex-wrap gap-x-10 gap-y-28 justify-center">
                {items.map((item) => (
                    <MenuItem key={item.menuItemId} item={item} />
                ))}
            </div>
        </section>
    );
}
