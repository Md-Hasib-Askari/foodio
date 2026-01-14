import { ItemType } from "@/app/page";
import MenuItem from "./MenuItem";

interface MenuGridProps {
    items: ItemType[];
    className?: string;
}

export default function MenuGrid({ items, className }: MenuGridProps) {
    return (
        <section
            className={`
                pb-20 sm:pb-32 md:pb-47.5
                max-w-309 mx-auto
                px-4 sm:px-6 lg:px-0
                ${className || ""}
            `}
        >
            <div
                className="
                    flex flex-wrap justify-center
                    gap-x-6 sm:gap-x-8 md:gap-x-10
                    gap-y-16 sm:gap-y-20 md:gap-y-28
                "
            >
                {items.map((item) => (
                    <MenuItem key={item.menuItemId} item={item} />
                ))}
            </div>
        </section>
    );
}
