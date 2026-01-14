'use client';

import { ROUTES } from "@/constants/routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiFoodMenu } from "react-icons/bi";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
    const router = useRouter();

    return (
        <section className="max-w-309 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 py-12 md:py-16 px-4 sm:px-6 xl:px-0 items-center overflow-hidden">
            <div className="z-0">
                <span className="inline-flex items-center gap-2 bg-secondary text-primary px-4 py-1 rounded-full text-xs sm:text-sm mb-6">
                    <BiFoodMenu className="text-base sm:text-lg inline-block mr-2" />
                    <span>Food Ordering Service</span>
                </span>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-primary leading-tight mb-6">
                    Where Great Food <br className="hidden sm:block" /> Meets Great Taste.
                </h1>

                <p className="text-gray-600 mb-8 max-w-lg text-sm sm:text-base">
                    Experience a symphony of flavors crafted with passion. Premium
                    ingredients, exquisite recipes, delivered to your door.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.push(ROUTES.MENU)}
                        className="bg-primary text-white px-6 py-3 rounded-full"
                    >
                        Order Now <FaArrowRight className="inline-block ml-2" />
                    </button>
                    <button
                        onClick={() => router.push(ROUTES.MENU)}
                        className="border border-primary text-primary px-6 py-3 rounded-full"
                    >
                        View Menu
                    </button>
                </div>
            </div>

            <div className="relative md:absolute md:top-0 md:-right-35 w-full md:w-1/2 bg-secondary rounded-bl-[120px] md:rounded-bl-[237px] pt-16 md:pt-25.25 flex justify-center md:justify-start">
                <Image
                    src="/landing-page/hero-dish.png"
                    alt="Food"
                    width={474}
                    height={474}
                    className="rounded-full w-64 sm:w-80 md:w-118.5 h-auto"
                    priority
                />
            </div>
        </section>
    );
}
