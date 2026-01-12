import MenuItem from "./MenuItem";

export default function MenuGrid({ items, className }: { items: { name: string; price: number }[]; className?: string }) {
    return (
        <section className={`pb-47.5 max-w-309 mx-auto ${className}`}>
            <div className="flex flex-wrap gap-x-10 gap-y-28 justify-center">
                {items.map((item) => (
                    <MenuItem key={item.name} item={item} />
                ))}
            </div>
        </section>
    );
}
