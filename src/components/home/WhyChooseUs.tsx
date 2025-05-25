"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        icon: "🎯",
        title: "Precision in Execution",
        description:
            "From concept to completion, we oversee every phase with meticulous attention to detail, ensuring a seamless workflow and timely delivery.",
    },
    {
        icon: "🌱",
        title: "Craftsmanship & Sustainability",
        description:
            "Passionate about integrating sustainable materials and high-quality finishes, we bring a refined aesthetic while promoting environmentally conscious choices.",
    },
    {
        icon: "✨",
        title: "Tailored Solutions",
        description:
            "Whether it's residential, commercial, or bespoke interior projects, we adapt strategies to meet unique design needs.",
    },
    {
        icon: "🏆",
        title: "Proven Excellence",
        description:
            "With over 10 years of combined experience and 50+ successful projects, our track record speaks for our commitment to quality.",
    },
];

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLOptionElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const image = imageRef.current;
        const featuresContainer = featuresRef.current;

        if (!section || !title || !image || !featuresContainer) return;

        // Initial setup
        gsap.set([title, image], { opacity: 0, y: 80 });
        gsap.set(featuresContainer.children, { opacity: 0, x: -60 });

        // Reveal animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 70%",
                end: "bottom 30%",
                toggleActions: "play none none reverse",
            },
        });

        tl.to(title, {
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
                featuresContainer.children,
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out",
                },
                "-=0.3"
            );

        // Parallax effect for image
        gsap.to(image, {
            yPercent: -15,
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
        <section ref={sectionRef} className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <div ref={imageRef} className="relative order-2 lg:order-1">
                        <div className="relative overflow-hidden rounded-lg">
                            <Image
                                src="/images/about/design-process.jpg"
                                alt="InchScale Design Process"
                                width={600}
                                height={600}
                                className="w-full h-[500px] lg:h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent" />
                        </div>

                        {/* Floating Stats Card */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                            <div className="text-center">
                                <div className="text-3xl font-playfair font-bold text-accent mb-2">
                                    10+
                                </div>
                                <div className="text-sm text-text-light font-medium">
                                    Years Experience
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 lg:order-2">
                        <div ref={titleRef} className="mb-12">
                            <span className="text-accent font-medium tracking-wider uppercase text-sm">
                                Why Choose Us
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-dark mt-4 mb-6">
                                What Sets Us
                                <span className="text-gradient"> Apart</span>
                            </h2>
                            <p className="text-xl text-text-light leading-relaxed">
                                We combine years of expertise with innovative
                                design thinking to deliver spaces that exceed
                                expectations and stand the test of time.
                            </p>
                        </div>

                        {/* Features */}
                        <div ref={featuresRef} className="space-y-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 group hover:bg-primary/50 p-4 rounded-lg transition-all duration-300"
                                >
                                    <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-accent transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-text-light leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-12">
                            <button className="btn-primary px-8 py-3">
                                Start Your Project
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
