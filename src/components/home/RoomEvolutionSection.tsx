"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Room evolution phases
const phases = [
    {
        id: 1,
        title: "Raw Space",
        subtitle: "The Beginning",
        description:
            "Every masterpiece starts with potential. Raw concrete, endless possibilities.",
        image: "/images/room-evolution/phase-1-raw.png",
        position: "left",
    },
    {
        id: 2,
        title: "Blueprint Vision",
        subtitle: "The Planning",
        description:
            "Where architecture meets artistry. Every line drawn with intention.",
        image: "/images/room-evolution/phase-2-blueprint.png",
        position: "right",
    },
    {
        id: 3,
        title: "Taking Shape",
        subtitle: "The Building",
        description:
            "Materials breathe life into vision. Craftsmanship meets innovation.",
        image: "/images/room-evolution/phase-3-construction.png",
        position: "left",
    },
    {
        id: 4,
        title: "Living Luxury",
        subtitle: "The Transformation",
        description:
            "Where your story meets interior excellence. This is InchScale.",
        image: "/images/room-evolution/phase-4-complete.png",
        position: "center",
    },
];

export default function RoomEvolutionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        // Set up the main timeline
        const mainTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const phaseIndex = Math.floor(
                        progress * (phases.length - 1)
                    );

                    if (
                        phaseIndex !== currentPhase &&
                        phaseIndex < phases.length
                    ) {
                        setCurrentPhase(phaseIndex);
                    }
                },
                onEnter: () => setIsInView(true),
                onLeave: () => setIsInView(false),
                onEnterBack: () => setIsInView(true),
                onLeaveBack: () => setIsInView(false),
            },
        });

        // Image morphing animation
        const images = container.querySelectorAll(".evolution-image");

        images.forEach((img, index) => {
            if (index === 0) return; // First image starts visible

            const startProgress = index / (phases.length - 1);
            const endProgress = Math.min(startProgress + 0.1, 1);

            gsap.set(img, {
                clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                scale: 1.1,
            });

            mainTimeline.to(
                img,
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.inOut",
                },
                startProgress
            );
        });

        // Texture overlay animation for premium feel
        const textureOverlay = container.querySelector(".texture-overlay");
        if (textureOverlay) {
            mainTimeline.to(
                textureOverlay,
                {
                    opacity: 0.1,
                    scale: 1.05,
                    rotation: 1,
                    duration: 1,
                    ease: "none",
                },
                0
            );
        }

        // Text animations
        const textElements = container.querySelectorAll(".phase-text");
        textElements.forEach((text, index) => {
            const startProgress = index / (phases.length - 1);

            gsap.set(text, {
                opacity: 0,
                x:
                    phases[index].position === "right"
                        ? 100
                        : phases[index].position === "left"
                        ? -100
                        : 0,
                y: 50,
            });

            if (index === 0) {
                gsap.set(text, { opacity: 1, x: 0, y: 0 });
            } else {
                mainTimeline.to(
                    text,
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 0.2,
                        ease: "power2.out",
                    },
                    startProgress + 0.05
                );

                if (index > 0) {
                    mainTimeline.to(
                        textElements[index - 1],
                        {
                            opacity: 0,
                            x:
                                phases[index - 1].position === "right"
                                    ? -50
                                    : 50,
                            y: -30,
                            duration: 0.15,
                            ease: "power2.in",
                        },
                        startProgress
                    );
                }
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [currentPhase]);

    return (
        <section
            ref={sectionRef}
            className="relative h-[400vh] bg-primary overflow-hidden"
        >
            <div
                ref={containerRef}
                className="sticky top-0 h-screen w-full flex items-center justify-center"
            >
                {/* Background Images */}
                <div className="absolute inset-0">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className="evolution-image absolute inset-0"
                            style={{ zIndex: phases.length - index }}
                        >
                            <Image
                                src={phase.image}
                                alt={phase.title}
                                fill
                                className="object-cover"
                                quality={95}
                                priority={index < 2}
                            />
                        </div>
                    ))}

                    {/* Premium Texture Overlay */}
                    <div className="texture-overlay absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none">
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `
                                    radial-gradient(circle at 25% 25%, rgba(140, 108, 85, 0.1) 0%, transparent 50%),
                                    radial-gradient(circle at 75% 75%, rgba(46, 42, 38, 0.1) 0%, transparent 50%),
                                    linear-gradient(45deg, transparent 49%, rgba(240, 233, 225, 0.03) 50%, transparent 51%)
                                `,
                                backgroundSize:
                                    "100px 100px, 150px 150px, 20px 20px",
                            }}
                        />
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className={`phase-text absolute inset-0 flex items-center ${
                                phase.position === "left"
                                    ? "justify-start"
                                    : phase.position === "right"
                                    ? "justify-end"
                                    : "justify-center"
                            }`}
                        >
                            <div
                                className={`max-w-lg p-8 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl ${
                                    phase.position === "center"
                                        ? "text-center"
                                        : ""
                                }`}
                                style={{
                                    background: `linear-gradient(135deg, 
                                        rgba(240, 233, 225, 0.15) 0%, 
                                        rgba(140, 108, 85, 0.1) 100%)`,
                                }}
                            >
                                <div className="text-sm font-medium text-white/80 tracking-wider uppercase mb-2">
                                    {phase.subtitle}
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                                    {phase.title}
                                </h2>
                                <p className="text-lg text-white/90 leading-relaxed mb-6">
                                    {phase.description}
                                </p>

                                {/* Progress Indicator */}
                                <div className="flex items-center space-x-2 mb-6">
                                    {phases.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1 rounded-full transition-all duration-500 ${
                                                i <= index
                                                    ? "bg-white w-8"
                                                    : "bg-white/30 w-4"
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* CTA for final phase */}
                                {index === phases.length - 1 && (
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="/book-consultation"
                                            className="bg-accent text-white px-8 py-4 text-lg font-medium hover:bg-dark transition-all duration-300 transform hover:scale-105 shadow-lg"
                                        >
                                            Start Your Transformation
                                        </Link>
                                        <Link
                                            href="/projects"
                                            className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-dark transition-all duration-300 transform hover:scale-105"
                                        >
                                            View Our Work
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scroll Indicator */}
                {currentPhase < phases.length - 1 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex flex-col items-center text-white/70">
                            <span className="text-sm tracking-widest uppercase mb-4">
                                Scroll to Transform
                            </span>
                            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Phase Counter */}
                <div className="absolute top-8 right-8 z-20">
                    <div className="text-white/80 font-mono text-sm">
                        <span className="text-xl font-bold text-white">
                            {String(currentPhase + 1).padStart(2, "0")}
                        </span>
                        <span className="mx-2">/</span>
                        <span>{String(phases.length).padStart(2, "0")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
