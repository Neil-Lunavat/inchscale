"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/animations/LoadingScreen";
import RoomEvolutionSection from "@/components/home/RoomEvolutionSection";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Enhanced loading experience
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading && <LoadingScreen />}

            <div className={`main-content ${!isLoading ? "loaded" : ""}`}>
                {/* The MAIN EVENT - Room Evolution */}
                <RoomEvolutionSection />

                {/* Simple Brand Statement Footer */}
                <section className="relative py-16 bg-dark text-white overflow-hidden">
                    {/* Subtle texture background */}
                    <div className="absolute inset-0 opacity-5">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at 25% 25%, rgba(240, 233, 225, 0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, rgba(140, 108, 85, 0.1) 0%, transparent 50%)
                                `,
                                backgroundSize: "100px 100px, 150px 150px",
                            }}
                        />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
                        {/* InchScale Brand */}
                        <div className="mb-8">
                            <h1 className="text-3xl lg:text-4xl font-playfair font-bold mb-2">
                                InchScale
                            </h1>
                            <p className="text-sm tracking-[0.3em] uppercase text-white/60">
                                Design Studio
                            </p>
                        </div>

                        {/* Brand Statement */}
                        <div className="mb-12">
                            <h2 className="text-xl lg:text-2xl font-light text-white/90 leading-relaxed max-w-2xl mx-auto">
                                "Where your story meets interior excellence"
                            </h2>
                        </div>

                        {/* Contact Info */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div>
                                <h3 className="text-sm font-medium tracking-wider uppercase text-white/60 mb-4">
                                    Get In Touch
                                </h3>
                                <div className="space-y-3">
                                    <a
                                        href="mailto:srishti@inchscale.co.in"
                                        className="block text-white/90 hover:text-white transition-colors duration-300"
                                    >
                                        srishti@inchscale.co.in
                                    </a>
                                    <a
                                        href="tel:+919175022711"
                                        className="block text-white/90 hover:text-white transition-colors duration-300"
                                    >
                                        +91 9175022711
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium tracking-wider uppercase text-white/60 mb-4">
                                    Based In
                                </h3>
                                <p className="text-white/90">
                                    Koregaon Park
                                    <br />
                                    Pune, Maharashtra
                                </p>
                            </div>
                        </div>

                        {/* Simple Navigation */}
                        <div className="flex flex-wrap justify-center gap-8 mb-8">
                            <a
                                href="/about"
                                className="text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
                            >
                                About
                            </a>
                            <a
                                href="/projects"
                                className="text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
                            >
                                Projects
                            </a>
                            <a
                                href="/contact"
                                className="text-white/70 hover:text-white transition-colors duration-300 tracking-wide"
                            >
                                Contact
                            </a>
                        </div>

                        {/* Philosophy */}
                        <div className="border-t border-white/10 pt-8">
                            <p className="text-white/60 text-sm max-w-xl mx-auto leading-relaxed">
                                "Never Back Down, Till The Last Moment" -
                                Crafting excellence in every detail, every
                                project, every transformation.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
