"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPreview() {
    const sectionRef = useRef<HTMLOptionElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const content = contentRef.current;
        const image = imageRef.current;
        const stats = statsRef.current;

        if (!section || !content || !image || !stats) return;

        // Reveal animations
        gsap.set([content, image], { opacity: 0, y: 80 });
        gsap.set(stats.children, { opacity: 0, y: 40 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(content, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
        })
            .to(
                image,
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                },
                "-=0.5"
            )
            .to(
                stats.children,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                },
                "-=0.3"
            );

        // Parallax effect for image
        gsap.to(image, {
            yPercent: -20,
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

    const stats = [
        { number: "10+", label: "Years Experience" },
        { number: "50+", label: "Projects Completed" },
        { number: "100%", label: "Client Satisfaction" },
    ];

    return (
        <section ref={sectionRef} className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Content */}
                    <div ref={contentRef}>
                        <div className="mb-8">
                            <span className="text-accent font-medium tracking-wider uppercase text-sm">
                                About InchScale
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-dark mt-4 mb-6">
                                Where Stories Come to
                                <span className="text-gradient"> Life</span>
                            </h2>
                            <p className="text-lg text-text-light leading-relaxed mb-6">
                                At InchScale, we don't just build spaces - we
                                bring stories to life. As a full-service design
                                and build studio, we weave architecture,
                                construction, and project management into one
                                seamless narrative.
                            </p>
                            <p className="text-lg text-text-light leading-relaxed mb-8">
                                Every project is a unique journey, tailored to
                                your lifestyle, aesthetics, and aspirations -
                                crafted with care, delivered on time, and built
                                to inspire.
                            </p>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-dark mb-2">
                                        Precision in Execution
                                    </h3>
                                    <p className="text-text-light">
                                        From concept to completion, we oversee
                                        every phase with meticulous attention to
                                        detail, ensuring seamless workflow and
                                        timely delivery.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-6 h-6 bg-accent rounded-full flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-dark mb-2">
                                        Sustainable Craftsmanship
                                    </h3>
                                    <p className="text-text-light">
                                        Passionate about integrating sustainable
                                        materials and high-quality finishes
                                        while promoting environmentally
                                        conscious choices.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            className="btn-primary inline-block"
                        >
                            Learn More About Us
                        </Link>
                    </div>

                    {/* Image */}
                    <div ref={imageRef} className="relative">
                        <div className="relative overflow-hidden rounded-lg">
                            <Image
                                src="/images/about/studio-workspace.jpg"
                                alt="InchScale Design Studio Workspace"
                                width={600}
                                height={700}
                                className="w-full h-[500px] lg:h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div
                    ref={statsRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl lg:text-6xl font-playfair font-bold text-accent mb-2">
                                {stat.number}
                            </div>
                            <div className="text-text-light font-medium tracking-wide">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
