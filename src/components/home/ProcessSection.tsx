"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const processSteps = [
    {
        step: "01",
        title: "Initial Consultation",
        duration: "Week 1",
        description:
            "Understanding your vision, requirements, and establishing project objectives and timeline.",
    },
    {
        step: "02",
        title: "Concept Development",
        duration: "Week 2-3",
        description:
            "Creating design concepts, mood boards, and material selection tailored to your style.",
    },
    {
        step: "03",
        title: "Design & Planning",
        duration: "Week 4-6",
        description:
            "Detailed design development, technical drawings, and comprehensive project planning.",
    },
    {
        step: "04",
        title: "Procurement",
        duration: "Week 7-8",
        description:
            "Sourcing materials, furniture, and coordinating with vendors for optimal quality and pricing.",
    },
    {
        step: "05",
        title: "Construction",
        duration: "Week 11-16",
        description:
            "Expert execution with continuous monitoring, quality control, and progress updates.",
    },
    {
        step: "06",
        title: "Final Touches",
        duration: "Week 17-18",
        description:
            "Styling, finishing touches, and ensuring every detail meets our high standards.",
    },
    {
        step: "07",
        title: "Handover",
        duration: "Week 19-20",
        description:
            "Final walkthrough, documentation, and celebrating your completed space.",
    },
];

export default function ProcessSection() {
    const sectionRef = useRef<HTMLOptionElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const title = titleRef.current;
        const timeline = timelineRef.current;

        if (!section || !title || !timeline) return;

        // Initial setup
        gsap.set(title, { opacity: 0, y: 60 });
        gsap.set(timeline.children, { opacity: 0, x: -100 });

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
            timeline.children,
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            },
            "-=0.5"
        );

        // Progressive line animation
        const line = timeline.querySelector(".process-line");
        if (line) {
            gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
            gsap.to(line, {
                scaleY: 1,
                duration: 2,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: timeline,
                    start: "top 60%",
                    end: "bottom 40%",
                    scrub: 1,
                },
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="section-padding bg-primary overflow-hidden"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={titleRef} className="text-center mb-16">
                    <span className="text-accent font-medium tracking-wider uppercase text-sm">
                        Our Process
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-dark mt-4 mb-6">
                        From Vision to
                        <span className="text-gradient"> Reality</span>
                    </h2>
                    <p className="text-xl text-text-light max-w-3xl mx-auto leading-relaxed">
                        Our structured approach ensures every project is
                        delivered with precision, quality, and on schedule.
                        Here's how we bring your space to life.
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative max-w-4xl mx-auto">
                    {/* Connecting Line */}
                    <div className="process-line absolute left-6 md:left-1/2 top-0 w-0.5 h-full bg-accent/30 transform md:-translate-x-1/2 z-0" />

                    {processSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative flex items-center mb-12 last:mb-0 ${
                                index % 2 === 0
                                    ? "md:flex-row"
                                    : "md:flex-row-reverse"
                            }`}
                        >
                            {/* Step Number (Center) */}
                            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center z-10 shadow-lg">
                                <span className="text-white font-bold text-sm">
                                    {step.step}
                                </span>
                            </div>

                            {/* Content */}
                            <div
                                className={`flex-1 ml-20 md:ml-0 ${
                                    index % 2 === 0
                                        ? "md:pr-8 md:text-right"
                                        : "md:pl-8 md:text-left"
                                }`}
                            >
                                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-xl font-bold text-dark">
                                            {step.title}
                                        </h3>
                                        <span className="text-accent font-medium text-sm bg-accent/10 px-3 py-1 rounded-full">
                                            {step.duration}
                                        </span>
                                    </div>
                                    <p className="text-text-light leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Spacer for mobile */}
                            <div className="hidden md:block flex-1" />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-text-light mb-8 text-lg">
                        Ready to start your journey? Let's discuss your project
                        timeline.
                    </p>
                    <button className="btn-primary px-8 py-3">
                        Schedule Consultation
                    </button>
                </div>
            </div>
        </section>
    );
}
