"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Room evolution phases - simplified and more reliable
const phases = [
    {
        id: 1,
        title: "Raw Space",
        subtitle: "The Beginning",
        description:
            "Every masterpiece starts with potential. Raw concrete, endless possibilities.",
        image: "/images/room-evolution/phase-1.png", // Raw concrete space
        position: "left" as const,
    },
    {
        id: 2,
        title: "Blueprint Vision",
        subtitle: "The Planning",
        description:
            "Where architecture meets artistry. Every line drawn with intention.",
        image: "/images/room-evolution/phase-2.png", // Blueprint/planning phase
        position: "right" as const,
    },
    {
        id: 3,
        title: "Taking Shape",
        subtitle: "The Building",
        description:
            "Materials breathe life into vision. Craftsmanship meets innovation.",
        image: "/images/room-evolution/phase-3.png", // Construction phase
        position: "left" as const,
    },
    {
        id: 4,
        title: "Living Luxury",
        subtitle: "The Transformation",
        description:
            "Where your story meets interior excellence. This is InchScale.",
        image: "/images/room-evolution/phase-4.png", // Finished luxury room
        position: "center" as const,
    },
];

export default function RoomEvolutionSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        // Set initial states
        gsap.set(".phase-content", { opacity: 0, y: 50 });
        gsap.set(".phase-content:first-child", { opacity: 1, y: 0 });

        // Create main ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                if (isAnimating) return;

                const progress = self.progress;
                const newPhase = Math.min(
                    Math.floor(progress * phases.length),
                    phases.length - 1
                );

                if (newPhase !== currentPhase) {
                    changePhase(newPhase);
                }
            },
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [currentPhase, isAnimating]);

    const changePhase = (newPhase: number) => {
        if (newPhase === currentPhase || isAnimating) return;

        setIsAnimating(true);

        const currentContent = document.querySelector(
            `.phase-content[data-phase="${currentPhase}"]`
        );
        const newContent = document.querySelector(
            `.phase-content[data-phase="${newPhase}"]`
        );

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentPhase(newPhase);
                setIsAnimating(false);
            },
        });

        // Fade out current content
        if (currentContent) {
            tl.to(currentContent, {
                opacity: 0,
                y: -30,
                duration: 0.3,
                ease: "power2.in",
            });
        }

        // Fade in new content
        if (newContent) {
            tl.fromTo(
                newContent,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.1"
            );
        }
    };

    const goToPhase = (phaseIndex: number) => {
        if (phaseIndex !== currentPhase && !isAnimating) {
            changePhase(phaseIndex);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[400vh] bg-dark overflow-hidden"
        >
            <div
                ref={containerRef}
                className="sticky top-0 h-screen w-full flex items-center justify-center"
            >
                {/* Background Images with smooth transitions */}
                <div className="absolute inset-0">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                index === currentPhase
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            style={{ zIndex: index === currentPhase ? 2 : 1 }}
                        >
                            <Image
                                src={phase.image}
                                alt={phase.title}
                                fill
                                className="object-cover"
                                quality={90}
                                priority={index < 2}
                                sizes="100vw"
                            />
                        </div>
                    ))}

                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 z-3" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 h-full flex items-center">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            data-phase={index}
                            className={`phase-content absolute inset-0 flex items-center ${
                                phase.position === "left"
                                    ? "justify-start"
                                    : phase.position === "right"
                                    ? "justify-end"
                                    : "justify-center"
                            }`}
                            style={{
                                opacity: index === currentPhase ? 1 : 0,
                                pointerEvents:
                                    index === currentPhase ? "auto" : "none",
                            }}
                        >
                            <div
                                className={`max-w-lg p-8 rounded-lg backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl ${
                                    phase.position === "center"
                                        ? "text-center"
                                        : ""
                                }`}
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
                                <div className="flex items-center justify-center space-x-2 mb-6">
                                    {phases.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goToPhase(i)}
                                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                                                i <= currentPhase
                                                    ? "bg-white w-8"
                                                    : "bg-white/30 w-4"
                                            }`}
                                            aria-label={`Go to phase ${i + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* CTA for final phase */}
                                {index === phases.length - 1 && (
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href="/book-consultation"
                                            className="bg-accent text-white px-8 py-4 text-lg font-medium hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                                        >
                                            Start Your Transformation
                                        </Link>
                                        <Link
                                            href="/projects"
                                            className="border-2 border-white text-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-dark transition-all duration-300 transform hover:scale-105 text-center"
                                        >
                                            View Our Work
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Manual Navigation Dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex space-x-3">
                        {phases.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPhase(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentPhase
                                        ? "bg-white scale-125"
                                        : "bg-white/50 hover:bg-white/70"
                                }`}
                                aria-label={`Go to phase ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Phase Counter */}
                <div className="absolute top-8 right-8 z-20">
                    <div className="text-white/80 font-mono text-sm bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <span className="text-xl font-bold text-white">
                            {String(currentPhase + 1).padStart(2, "0")}
                        </span>
                        <span className="mx-2">/</span>
                        <span>{String(phases.length).padStart(2, "0")}</span>
                    </div>
                </div>

                {/* Scroll Hint */}
                {currentPhase < phases.length - 1 && (
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="flex flex-col items-center text-white/70">
                            <span className="text-sm tracking-widest uppercase mb-4 animate-pulse">
                                Scroll to Transform
                            </span>
                            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
