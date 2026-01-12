import Image from "next/image";
import { BiFoodMenu } from "react-icons/bi";


export default function Hero() {
    return (
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16 items-center">
            <div className="">
                <span className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1 rounded-full text-sm mb-6">
                    <BiFoodMenu className="text-lg inline-block mr-2" />
                    <span>Food Ordering Service</span>
                </span>


                <h1 className="text-5xl font-serif text-primary leading-tight mb-6">
                    Where Great Food <br /> Meets Great Taste.
                </h1>

                <p className="text-gray-600 mb-8 max-w-lg">
                    Experience a symphony of flavors crafted with passion. Premium
                    ingredients, exquisite recipes, delivered to your door.
                </p>

                <div className="flex gap-4">
                    <button className="bg-primary text-white px-6 py-3 rounded-full">
                        Order Now →
                    </button>
                    <button className="border border-primary text-primary px-6 py-3 rounded-full">
                        View Menu
                    </button>
                </div>
            </div>

            <div className="absolute top-0 z-0 -right-35 w-1/2 bg-secondary rounded-bl-[237px] pt-25.25 flex justify-items-start">
                <Image
                    src="/landing-page/hero-dish.png"
                    alt="Food"
                    width={474}
                    height={474}
                    className="rounded-full"
                />
                {/* <div className="size-118.5 rounded-full p-8.75 flex items-center justify-center">
                    <div className="size-100 bg-black rounded-full"></div>
                </div> */}
            </div>
        </section>
    );
}
