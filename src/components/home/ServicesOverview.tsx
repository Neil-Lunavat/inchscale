"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const services = [
    {
        title: "Project Planning & Design",
        description:
            "Comprehensive project planning, scope definition, and design development with stakeholder coordination.",
        features: [
            "Timeline & Budget Planning",
            "Design Concept Development",
            "Stakeholder Coordination",
        ],
    },
    {
        title: "Interior Design",
        description:
            "Complete interior design solutions from concept to completion for residential and commercial spaces.",
        features: [
            "Space Planning",
            "Material Selection",
            "Custom Furniture Design",
        ],
    },
    {
        title: "Construction & Build",
        description:
            "Full construction management and execution with quality craftsmanship and timely delivery.",
        features: [
            "Construction Management",
            "Quality Control",
            "Timeline Management",
        ],
    },
    {
        title: "Project Management",
        description:
            "End-to-end project management ensuring seamless execution and client satisfaction.",
        features: [
            "Resource Allocation",
            "Progress Monitoring",
            "Client Communication",
        ],
    },
];

export default function ServicesOverview() {
    const sectionRef = useRef<HTMLOptionElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current;

        if (!section || !title || !cards) return;

        // Initial setup
        gsap.set(title, { opacity: 0, y: 60 });
        gsap.set(cards.children, { opacity: 0, y: 80, scale: 0.9 });

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
        }).to(
            cards.children,
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)",
            },
            "-=0.5"
        );

        // Hover effects for cards
        const cardElements = cards.children;
        Array.from(cardElements).forEach((card) => {
            const cardElement = card as HTMLElement;

            cardElement.addEventListener("mouseenter", () => {
                gsap.to(cardElement, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });

            cardElement.addEventListener("mouseleave", () => {
                gsap.to(cardElement, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-primary">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">
                        Our Services
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-dark mt-4 mb-6">
                        Comprehensive Design &
                        <span className="text-gradient"> Build Solutions</span>
                    </h2>
                    <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
                        From initial consultation to final handover, we provide
                        end-to-end solutions that transform your vision into
                        exceptional spaces.
                    </p>
                </div>

                {/* Services Grid */}
                <div
                    ref={cardsRef}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        >
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                                    <div className="w-8 h-8 bg-accent rounded-full group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-accent transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-text-light leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <ul className="space-y-2">
                                {service.features.map(
                                    (feature, featureIndex) => (
                                        <li
                                            key={featureIndex}
                                            className="flex items-center text-sm text-text-light"
                                        >
                                            <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-text-light mb-8 text-lg">
                        Ready to start your project? Let's discuss your vision.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="btn-primary px-8 py-3">
                            View All Services
                        </button>
                        <button className="btn-secondary px-8 py-3">
                            Get Quote
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
