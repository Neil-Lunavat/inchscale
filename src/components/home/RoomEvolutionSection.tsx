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

    useEffect(() => {
        if (typeof window === "undefined") return;

        const section = sectionRef.current;
        const container = containerRef.current;
        if (!section || !container) return;

        // Kill any existing ScrollTriggers first
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

        // Set initial states for all phase contents with proper positioning
        phases.forEach((_, index) => {
            const content = document.querySelector(`[data-phase="${index}"]`);
            const isFromLeft = index % 2 === 0;
            const slideDistance = 120;

            if (content) {
                const elements = content.querySelectorAll(
                    ".subtitle-element, .title-element, .description-element, .cta-element"
                );

                if (index === 0) {
                    // First phase visible
                    gsap.set(elements, { opacity: 1, x: 0 });

                    // Animate in the first phase elements
                    gsap.fromTo(
                        elements,
                        {
                            opacity: 0,
                            x: isFromLeft ? -slideDistance : slideDistance,
                        },
                        {
                            opacity: 1,
                            x: 0,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: "power2.out",
                            delay: 0.5,
                        }
                    );
                } else {
                    // Other phases hidden
                    gsap.set(elements, {
                        opacity: 0,
                        x: isFromLeft ? -slideDistance : slideDistance,
                    });
                }
            }
        });

        // Create the main ScrollTrigger with proper configuration
        const mainTrigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: container, // Pin the container, not the section
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;
                // Map progress to phases (0-3)
                const rawPhase = progress * (phases.length - 1);
                const newPhase = Math.min(
                    Math.floor(rawPhase),
                    phases.length - 1
                );

                if (newPhase !== currentPhase) {
                    changePhase(newPhase);
                }
            },
            onRefresh: () => {
                // Reset to first phase on refresh
                setCurrentPhase(0);
            },
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => {
            mainTrigger.kill();
        };
    }, []);

    const changePhase = (newPhase: number) => {
        if (
            newPhase === currentPhase ||
            newPhase < 0 ||
            newPhase >= phases.length
        )
            return;

        const currentContent = document.querySelector(
            `[data-phase="${currentPhase}"]`
        );
        const newContent = document.querySelector(`[data-phase="${newPhase}"]`);

        if (!currentContent || !newContent) return;

        // Determine animation direction for new phase
        const isFromLeft = newPhase % 2 === 0;
        const slideDistance = 120;

        // Create timeline for smooth transition
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentPhase(newPhase);
            },
        });

        // Animate out current content elements
        const currentElements = currentContent.querySelectorAll(
            ".subtitle-element, .title-element, .description-element, .cta-element"
        );
        if (currentElements.length > 0) {
            tl.to(currentElements, {
                opacity: 0,
                x: isFromLeft ? slideDistance : -slideDistance,
                duration: 0.4,
                stagger: 0.1,
                ease: "power2.in",
            });
        }

        // Set initial state for new content elements
        const newElements = newContent.querySelectorAll(
            ".subtitle-element, .title-element, .description-element, .cta-element"
        );
        gsap.set(newElements, {
            opacity: 0,
            x: isFromLeft ? -slideDistance : slideDistance,
        });

        // Animate in new content elements with creative stagger
        tl.to(
            newElements,
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: {
                    amount: 0.4,
                    from: "start",
                },
                ease: "power2.out",
            },
            "-=0.2"
        );

        // Special animation for title words
        const titleWords = newContent.querySelectorAll(".title-element span");
        if (titleWords.length > 0) {
            gsap.set(titleWords, {
                x: isFromLeft ? -60 : 60,
                opacity: 0,
            });

            tl.to(
                titleWords,
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "back.out(1.7)",
                },
                "-=0.4"
            );
        }
    };

    const goToPhase = (phaseIndex: number) => {
        if (
            phaseIndex >= 0 &&
            phaseIndex < phases.length &&
            phaseIndex !== currentPhase
        ) {
            // Calculate the scroll position for this phase
            const section = sectionRef.current;
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const progress = phaseIndex / (phases.length - 1);
                const targetScroll =
                    sectionTop + sectionHeight * progress * 0.8;

                gsap.to(window, {
                    scrollTo: { y: targetScroll },
                    duration: 1,
                    ease: "power2.inOut",
                });
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative h-[400vh] bg-dark overflow-hidden"
        >
            <div
                ref={containerRef}
                className="h-screen w-full flex items-center justify-center relative"
            >
                {/* Background Images with smooth transitions */}
                <div className="absolute inset-0">
                    {phases.map((phase, index) => (
                        <div
                            key={phase.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
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
                    <div className="absolute inset-0 bg-black/50 z-3" />
                </div>

                {/* Content Overlay - Creative Side Animations */}
                <div className="relative z-10 w-full h-full">
                    {phases.map((phase, index) => {
                        // Determine animation direction based on index
                        const isFromLeft = index % 2 === 0;
                        const alignmentClass =
                            phase.position === "center"
                                ? "items-center justify-center text-center"
                                : phase.position === "left"
                                ? "items-center justify-start text-left"
                                : "items-center justify-end text-right";

                        return (
                            <div
                                key={phase.id}
                                data-phase={index}
                                className={`absolute inset-0 flex ${alignmentClass} px-6 lg:px-16`}
                            >
                                <div
                                    className={`max-w-2xl ${
                                        phase.position === "center"
                                            ? "text-center"
                                            : ""
                                    }`}
                                >
                                    {/* Subtitle */}
                                    <div
                                        className="subtitle-element text-sm font-medium text-white/70 tracking-[0.2em] uppercase mb-4 opacity-0"
                                        style={{
                                            transform: `translateX(${
                                                isFromLeft ? "-100px" : "100px"
                                            })`,
                                        }}
                                    >
                                        {phase.subtitle}
                                    </div>

                                    {/* Main Title */}
                                    <h2
                                        className="title-element text-5xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-none opacity-0"
                                        style={{
                                            transform: `translateX(${
                                                isFromLeft ? "-120px" : "120px"
                                            })`,
                                        }}
                                    >
                                        {phase.title
                                            .split(" ")
                                            .map((word, wordIndex) => (
                                                <span
                                                    key={wordIndex}
                                                    className="inline-block mr-4"
                                                    style={{
                                                        transform: `translateX(${
                                                            isFromLeft
                                                                ? "-40px"
                                                                : "40px"
                                                        })`,
                                                        transitionDelay: `${
                                                            wordIndex * 0.1
                                                        }s`,
                                                    }}
                                                >
                                                    {word}
                                                </span>
                                            ))}
                                    </h2>

                                    {/* Description */}
                                    <p
                                        className="description-element text-xl lg:text-2xl text-white/90 leading-relaxed mb-8 max-w-xl opacity-0"
                                        style={{
                                            transform: `translateX(${
                                                isFromLeft ? "-80px" : "80px"
                                            })`,
                                        }}
                                    >
                                        {phase.description}
                                    </p>

                                    {/* CTA for final phase */}
                                    {index === phases.length - 1 && (
                                        <div
                                            className="cta-element flex flex-col sm:flex-row gap-4 justify-center opacity-0"
                                            style={{
                                                transform: `translateX(${
                                                    isFromLeft
                                                        ? "-60px"
                                                        : "60px"
                                                })`,
                                            }}
                                        >
                                            <Link
                                                href="/book-consultation"
                                                className="bg-accent text-white px-8 py-4 text-lg font-medium hover:bg-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg text-center border-2 border-accent"
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
                        );
                    })}
                </div>

                {/* Progress Indicator - Moved outside content */}
                <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex items-center justify-center space-x-3 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full">
                        {phases.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goToPhase(i)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                                    i <= currentPhase
                                        ? "bg-white w-8 shadow-lg"
                                        : "bg-white/30 w-4"
                                }`}
                                aria-label={`Go to phase ${i + 1}`}
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
