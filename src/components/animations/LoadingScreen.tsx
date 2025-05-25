"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function LoadingScreen() {
    const [percentage, setPercentage] = useState(0);
    const loadingRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const blueprintRef = useRef<HTMLDivElement>(null);
    const percentageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const tl = gsap.timeline();

        // Blueprint grid animation
        const gridLines = blueprintRef.current?.querySelectorAll(".grid-line");
        if (gridLines) {
            gsap.set(gridLines, { scaleX: 0, transformOrigin: "left center" });

            gridLines.forEach((line, index) => {
                tl.to(
                    line,
                    {
                        scaleX: 1,
                        duration: 0.6,
                        ease: "power2.inOut",
                    },
                    index * 0.1
                );
            });
        }

        // Logo construction animation
        if (logoRef.current) {
            gsap.set(logoRef.current, {
                scale: 0.5,
                opacity: 0,
                rotateY: -90,
            });

            tl.to(
                logoRef.current,
                {
                    scale: 1,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "back.out(1.7)",
                },
                0.8
            );
        }

        // Percentage counter
        gsap.to(
            { val: 0 },
            {
                val: 100,
                duration: 2.8,
                ease: "power2.out",
                onUpdate: function () {
                    setPercentage(Math.round(this.targets()[0].val));
                },
            }
        );

        // Text animations
        if (textRef.current) {
            const chars = textRef.current.querySelectorAll(".char");
            gsap.set(chars, { opacity: 0, y: 20 });

            tl.to(
                chars,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.05,
                    stagger: 0.05,
                    ease: "power2.out",
                },
                1.5
            );
        }

        // Construction tools animation
        const tools = loadingRef.current?.querySelectorAll(".tool");
        if (tools) {
            tools.forEach((tool, index) => {
                gsap.set(tool, { scale: 0, rotation: -45 });
                tl.to(
                    tool,
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: "back.out(2)",
                    },
                    1 + index * 0.2
                );
            });
        }

        // Exit animation
        const exitTimer = setTimeout(() => {
            if (loadingRef.current) {
                // Create sophisticated exit
                gsap.to(loadingRef.current, {
                    opacity: 0,
                    scale: 1.05,
                    duration: 1.2,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (loadingRef.current) {
                            loadingRef.current.style.display = "none";
                        }
                    },
                });

                // Blueprint lines retract
                if (gridLines) {
                    gsap.to(gridLines, {
                        scaleX: 0,
                        duration: 0.8,
                        stagger: 0.05,
                        ease: "power2.in",
                    });
                }
            }
        }, 3200);

        return () => {
            clearTimeout(exitTimer);
            tl.kill();
        };
    }, []);

    return (
        <div ref={loadingRef} className="loading-screen bg-primary">
            {/* Blueprint Grid Background */}
            <div
                ref={blueprintRef}
                className="absolute inset-0 overflow-hidden pointer-events-none"
            >
                {/* Vertical Grid Lines */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={`v-${i}`}
                        className="grid-line absolute top-0 h-full w-px bg-accent/20"
                        style={{ left: `${(i + 1) * 8.33}%` }}
                    />
                ))}

                {/* Horizontal Grid Lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={`h-${i}`}
                        className="grid-line absolute left-0 w-full h-px bg-accent/20"
                        style={{ top: `${(i + 1) * 12.5}%` }}
                    />
                ))}

                {/* Corner Markers */}
                <div className="tool absolute top-8 left-8 w-6 h-6 border-2 border-accent/40" />
                <div className="tool absolute top-8 right-8 w-6 h-6 border-2 border-accent/40" />
                <div className="tool absolute bottom-8 left-8 w-6 h-6 border-2 border-accent/40" />
                <div className="tool absolute bottom-8 right-8 w-6 h-6 border-2 border-accent/40" />

                {/* Measurement Lines */}
                <div className="tool absolute top-1/4 left-12 right-12 h-px bg-accent/30">
                    <div className="absolute -left-2 -top-2 w-1 h-5 bg-accent/30" />
                    <div className="absolute -right-2 -top-2 w-1 h-5 bg-accent/30" />
                </div>

                <div className="tool absolute left-1/4 top-12 bottom-12 w-px bg-accent/30">
                    <div className="absolute -top-2 -left-2 w-5 h-1 bg-accent/30" />
                    <div className="absolute -bottom-2 -left-2 w-5 h-1 bg-accent/30" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
                {/* Logo */}
                <div ref={logoRef} className="mb-8">
                    <div className="relative">
                        <Image
                            src="/images/icons/logo.png"
                            alt="InchScale"
                            width={120}
                            height={120}
                            priority
                            className="relative z-10"
                        />

                        {/* Technical drawing overlay */}
                        <div className="absolute inset-0 border-2 border-accent/20 rounded-full" />
                        <div className="absolute top-1/2 left-0 right-0 h-px bg-accent/20" />
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent/20" />
                    </div>
                </div>

                {/* Brand Name with Construction Effect */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-playfair font-bold text-dark mb-2">
                        InchScale
                    </h1>
                    <div
                        ref={textRef}
                        className="text-sm tracking-[0.3em] uppercase text-accent/80"
                    >
                        {"Design Studio".split("").map((char, index) => (
                            <span key={index} className="char inline-block">
                                {char === " " ? "\u00A0" : char}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Percentage Counter */}
                <div ref={percentageRef} className="mb-12">
                    <div className="text-4xl font-mono font-light text-accent tracking-wider">
                        {percentage}%
                    </div>
                    <div className="w-32 h-px bg-accent/20 mt-4 mx-auto relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-accent transition-all duration-100"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                </div>

                {/* Philosophy */}
                <div className="text-center max-w-md">
                    <p className="text-sm text-accent/60 tracking-wide leading-relaxed">
                        "Where your story meets interior excellence"
                    </p>
                </div>
            </div>

            {/* Technical Annotations */}
            <div className="absolute bottom-8 left-8 text-xs text-accent/40 font-mono">
                <div>SCALE: 1:100</div>
                <div>PROJECT: TRANSFORMATION</div>
                <div>STATUS: INITIALIZING</div>
            </div>

            <div className="absolute bottom-8 right-8 text-xs text-accent/40 font-mono text-right">
                <div>INCHSCALE STUDIO</div>
                <div>EST. 2020</div>
                <div>PUNE, INDIA</div>
            </div>
        </div>
    );
}
