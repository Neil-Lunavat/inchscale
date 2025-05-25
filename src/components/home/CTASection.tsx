"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection() {
    const sectionRef = useRef<HTMLOptionElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const content = contentRef.current;
        const background = backgroundRef.current;

        if (!section || !content || !background) return;

        // Initial setup
        gsap.set(content.children, { opacity: 0, y: 80 });
        gsap.set(background, { scale: 1.1 });

        // Reveal animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(background, {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
        }).to(
            content.children,
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power2.out",
            },
            "-=1"
        );

        // Parallax effect for background
        gsap.to(background, {
            yPercent: -30,
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-dark via-accent to-dark"
        >
            {/* Background with Pattern */}
            <div ref={backgroundRef} className="absolute inset-0 ">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full" />
                    <div className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full" />
                    <div className="absolute bottom-20 left-20 w-40 h-40 border border-white/20 rounded-full" />
                    <div className="absolute bottom-10 right-10 w-28 h-28 border border-white/20 rounded-full" />
                </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div ref={contentRef} className="text-center text-white">
                    <h2 className="text-4xl lg:text-6xl font-playfair font-bold mb-6">
                        Ready to Transform
                        <span className="block text-primary">Your Space?</span>
                    </h2>

                    <p className="text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Let's bring your vision to life with our expertise in
                        luxury interior design and seamless project execution.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                        <Link
                            href="/book-consultation"
                            className="bg-white text-dark px-8 py-4 text-lg font-medium hover:bg-primary hover:text-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Book Free Consultation
                        </Link>
                        <Link
                            href="/projects"
                            className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-dark transition-all duration-300 transform hover:scale-105"
                        >
                            View Our Portfolio
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
                        <div className="text-center">
                            <div className="text-3xl font-playfair font-bold mb-2">
                                24-48h
                            </div>
                            <div className="text-white/80">Response Time</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-playfair font-bold mb-2">
                                Free
                            </div>
                            <div className="text-white/80">
                                Initial Consultation
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-playfair font-bold mb-2">
                                100%
                            </div>
                            <div className="text-white/80">
                                Satisfaction Guarantee
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/20">
                        <p className="text-white/80 mb-4">
                            Contact us directly for immediate assistance:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-lg">
                            <a
                                href="tel:+919175022711"
                                className="hover:text-primary transition-colors duration-300"
                            >
                                📞 +91 9175022711
                            </a>
                            <a
                                href="mailto:srishti@inchscale.co.in"
                                className="hover:text-primary transition-colors duration-300"
                            >
                                ✉️ srishti@inchscale.co.in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
